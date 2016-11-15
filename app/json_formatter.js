const fs = require('fs')
var _ = require('underscore');
const PATH_JSON_EXPORT = 'misc/scraping_result.json';

function JsonFormatter(code, name, price, trips, custom_prices) {
  this.base = {
        status: "ok",
        result: {
          trips: [
            {
              code: code,
              name: name,
              details: {
                price: price,
                roundTrips: trips
              }
            }
          ],
          custom: {
            prices: custom_prices
          }
        }
      };
}

JsonFormatter.prototype.generateJsonFile = function() {
  fs.writeFile(PATH_JSON_EXPORT, JSON.stringify(this.base, null, 4), function(err){
      console.log('File successfully written! :-)');
  })
}

module.exports = JsonFormatter;
