// var request = require('request');
var cheerio = require('cheerio');
var underscore = require('underscore');
const Scraper = require('./scraper')
const fs = require('fs')

fs.readFile('test/sample-page.html', 'utf-8', function (err, content) {
  if (err) {
    return console.log(err)
  }

  var scraper = new Scraper(content);
  var json_reservation = { code: "", name: "" }

  var code = scraper.getReservationCode();
  var name = scraper.getReservationName();
  var price = scraper.getReservationPrice();

  var $ = scraper.getContent();
  var trips = [];
  $('table[class*=product-details]>tbody>tr').each(function(index, elem) {
    console.log("["+index+"]");
    if (index % 2) {
      arrivalInfos = scraper.getTripArrival($(this));
      underscore.extend(trips[index - 1], arrivalInfos);
    } else {
      trips[index] = scraper.getTripDeparture($(this));
    }
  });

  console.log(trips);

  json_reservation.code = code
  json_reservation.name = name

  fs.writeFile('test/result.json', JSON.stringify(json_reservation, null, 4), function(err){
      console.log('File successfully written! - Check your project directory for the result.json file');
  })

  // var json_shell = {
  //   status : "ok",
  //   result : {
  //     trips: []
  //   }
  // };

  var json_round_trips = {
    type: "",
    date: "",
    trains: []
  }

  var json_train = {
    departureTime: "",
    departureStation: "",
    arrivalTime: "",
    arrivalStation: "",
    type: "",
    number: ""
  }

  // var $ = cheerio.load(content);
  //
  // var trains = [];
  // $('table[class*=product-details]>tbody>tr').each(function() {
  //   // trains[i] = this
  //   console.log($(this).text())
  // });

  //   if (i % 2) {
  //     console.log("["+i+"]")
  //     var arrivalTime = trains[i].children().eq(0).text().replace(/h/,".")
  //     arrivalTime = parseFloat(arrivalTime)
  //     console.log(arrivalTime)
  //     console.log(trains[i].children().eq(1).text()) // arrivalStation
  //   }
  //   else {
  //     console.log("["+i+"]")
  //     console.log(trains[i].children().eq(0).text()) // departureStation
  //     var departureTime = trains[i].children().eq(1).text().replace(/h/,".")
  //     departureTime = parseFloat(departureTime)
  //     console.log(departureTime)
  //     console.log(trains[i].children().eq(2).text()) // departureStation
  //     console.log(trains[i].children().eq(3).text()) // type
  //     console.log(trains[i].children().eq(4).text()) // number
  //   }
  // });

})
