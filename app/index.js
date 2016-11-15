const fs = require('fs');
const Scraper = require('./scraper');
const JsonFormatter = require('./json_formatter');
const PATH_SAMPLE_HTML = 'misc/sample-page.html';

fs.readFile(PATH_SAMPLE_HTML, 'utf-8', function (err, content) {
  if (err) {
    return console.log(err);
  }

  var scraper = new Scraper(content);

  var code = scraper.getReservationCode();
  var name = scraper.getReservationName();
  var price = scraper.getReservationPrice();
  var custom_prices = scraper.getCustomPrices();
  var trips = scraper.getTrips();

  var json_formatter = new JsonFormatter(code, name, price, trips, custom_prices);
  json_formatter.generateJsonFile();
})
