var cheerio = require('cheerio');
var DateFormatter = require('./date_formatter')
var _ = require('underscore');

function Scraper(content) {
  this.$ = cheerio.load(content);
}

// INSTANCE METHODS
Scraper.prototype.getContent = function() {
  return (this.$);
}

Scraper.prototype.getReservationCode = function() {
  var code = this.$('td[class*=pnr-ref]>span[class*=pnr-info]').last().text();
  return code.replace(/ /g,'');
}

Scraper.prototype.getReservationName = function() {
  var name = this.$('td[class*=pnr-name]>span[class*=pnr-info]').first().text();
  return name.replace(/ /g,'')
}

Scraper.prototype.getReservationPrice = function() {
  var price = this.$('table[class*=transaction-details]>tbody>tr:first-child>td').eq(1).text().replace(/,/, ".");
  price = parseFloat(price)
  return price
}

Scraper.prototype.getCustomPrices = function() {
  var array = new Array();
  var custom_price_1 = this.$('table[class*=product-header]>tbody>tr>td:last-child').eq(0).text().replace(/,/, ".");
  custom_price_1 = parseFloat(custom_price_1);
  var custom_price_2 = this.$('table[class*=product-header]>tbody>tr>td:last-child').eq(1).text();
  custom_price_2 = parseFloat(custom_price_2);
  var custom_price_3 = this.$('td[class*=amount]').text();
  custom_price_3 = parseFloat(custom_price_3);
  array.push({"value":custom_price_1}, {"value": custom_price_2}, {"value": custom_price_3});
  return array;
}

Scraper.prototype.getTrips = function () {
  var trips = new Array();
  var total_trips = this.$('table[class*=product-details]>tbody>tr').length;
  for (var index = 0; index < total_trips; index++) {
    elem = this.$('table[class*=product-details]>tbody>tr').eq(index);
    this.getTrip(index, elem, trips);
  }
  return trips
}

Scraper.prototype.getTrip = function(index, elem, trips){
  if (index % 2) {
    arrivalInfos = Scraper.getTripArrival(elem);
    index = Scraper.getEvenNumber(index);
    _.extend(trips[index].trains[0], arrivalInfos);
  }
  else {
    if (index > 0) { index = index / 2 }
    trips[index] = Scraper.getTripDeparture(elem, index, this.getContent());
  }
}

// CLASS METHODS

Scraper.getTripDeparture = function(train_infos, index, $) {
  var trip = new Object();
  var trains = [new Object()];
  var departure_time = train_infos.children().eq(1).text().replace(/h/,".");
  trains[0].departureTime  = DateFormatter.formatHour(departure_time);
  trains[0].departureStation = train_infos.children().eq(2).text().trim();
  trains[0].type = train_infos.children().eq(3).text().trim();
  trains[0].number = train_infos.children().eq(4).text().trim();
  trip.type = train_infos.children().eq(0).text().trim();
  trip.date = Scraper.getTravelDate(index, $);
  trip.trains = trains
  return trip;
}

Scraper.getTripArrival = function(train_infos) {
  var train = new Object();
  var arrival_time = train_infos.children().eq(0).text().replace(/h/, ".");
  train.arrivalTime = DateFormatter.formatHour(arrival_time);
  train.arrivalStation = train_infos.children().eq(1).text().trim();
  return train
}

Scraper.getTravelDate = function(index, $) {
  var date_array = $('td[class*=product-travel-date]').eq(index).text().trim().split(' ');
  var month_number = DateFormatter.convertMonthToNumber(date_array[2]);
  var day_number = DateFormatter.formatWithTwoNumbers(date_array[1]);
  var date_departure = "2016-" + month_number + "-"+ day_number +" 00:00:00.000Z";
  return (date_departure);
}

Scraper.getEvenNumber = function(index) {
  index = index == 0 ? index : ((index - 1) /2 );
  return (index);
}

module.exports = Scraper;
