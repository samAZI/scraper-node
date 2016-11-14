var cheerio = require('cheerio');
var underscore = require('underscore');

function Scraper(content) {
  this.$ = cheerio.load(content);
}

Scraper.prototype.getContent = function() {
  return (this.$);
}

Scraper.prototype.getReservationCode = function() {
  var code = this.$('td[class*=pnr-ref]>span[class*=pnr-info]').last().text();
  return code.replace(/ /g,'');
};

Scraper.prototype.getReservationName = function() {
  var name = this.$('td[class*=pnr-name]>span[class*=pnr-info]').first().text();
  return name.replace(/ /g,'')
};

Scraper.prototype.getReservationPrice = function() {
  var price = this.$('table[class*=transaction-details]>tbody>tr:first-child>td').eq(1).text().replace(/,/, ".");
  price = parseFloat(price)
  return price
};

Scraper.prototype.getTripDeparture = function(train_infos) {
  var trip = new Object();
  var departureTime = train_infos.children().eq(1).text().replace(/h/,".");
  trip.departureTime  = parseFloat(departureTime);
  trip.train_type = train_infos.children().eq(0).text();
  trip.departureStation2 = train_infos.children().eq(2).text();
  trip.type = train_infos.children().eq(3).text();
  trip.number = train_infos.children().eq(4).text();
  return trip;
}

Scraper.prototype.getTripArrival = function(train_infos) {
  var trip = new Object();
  var arrivalTime = train_infos.children().eq(0).text().replace(/h/,".")
  trip.arrivalTime = parseFloat(arrivalTime)
  trip.arrivalStation = train_infos.children().eq(1).text()
  return trip
}

Scraper.prototype.getTrips = function(train_infos) {
  var trains = [];
  product_details = this.$('table[class*=product-details]>tbody>tr');
  product_details.each(function (index, element) {
    // trains[index] = element
    if (index % 2) {
      console.log("["+index+"]")
      // var arrivalTime = trains[index].children().eq(0).text().replace(/h/,".")
      // arrivalTime = parseFloat(arrivalTime)
      // console.log(arrivalTime)
      // console.log(trains[index].children().eq(1).text()) // arrivalStation
      console.log(element.children().eq(1).text()) // arrivalStation
    }
    // else {
    //   console.log("["+index+"]")
    //   console.log(trains[index].children[0]) // departureStation
    //   var departureTime = trains[index].children[1]
    //   departureTime = parseFloat(departureTime)
    //   console.log(departureTime)
    //   console.log(trains[index].children[2]) // departureStation
    //   console.log(trains[index].children[3]) // type
    //   console.log(trains[index].children[4]) // number
    // }
  });

  // console.log(product_details);
  // underscore.each(product_details, function(product, index) {
  //   // console.log(product.children);
  //   trains[index] = product;
  //   childrens = underscore.map(product.children, function(children) {
  //     children
  //   });
    // console.log(childrens);

  // });

};

// class methods
// Foo.prototype.fooBar = function() {
//
// };
// export the class
module.exports = Scraper;
