var _ = require('underscore');
const Scraper = require('./scraper');
const JsonFormatter = require('./json_formatter');
const fs = require('fs');
const PATH_SAMPLE_HTML = 'misc/sample-page.html';

fs.readFile(PATH_SAMPLE_HTML, 'utf-8', function (err, content) {
  if (err) {
    return console.log(err);
  }

  var scraper = new Scraper(content);
  var $ = scraper.getContent();

  var code = scraper.getReservationCode();
  var name = scraper.getReservationName();
  var price = scraper.getReservationPrice();
  var custom_prices = scraper.getCustomPrices();
  // var trips = scraper.getTrips();

  var trips = new Array();
  $('table[class*=product-details]>tbody>tr').each(function(index, elem) {
    if (index % 2) {
      arrivalInfos = scraper.getTripArrival($(this));
      index = getEvenIndex(index);
      _.extend(trips[index].trains[0], arrivalInfos);
    } else {
      if (index > 0) { index = index / 2 }
      train = $(this)
      trips[index] = scraper.getTripDeparture(train);
      trips[index].date = scraper.getTravelDate(index);
    }
  });

  var json_formatter = new JsonFormatter(code, name, price, trips, custom_prices);
  json_formatter.generateJsonFile();
})

function getEvenIndex(index) {
  index = index == 0 ? index : ((index - 1) /2 );
  return (index);
}
