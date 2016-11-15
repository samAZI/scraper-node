// var assert = require('assert');
var Scraper = require('../app/scraper')
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

const fs = require('fs');

const EMPTY_STRING = ''
const PATH_SAMPLE_TEST = './sample_page_test.html'

function loadSampleHTML() {
  fs.readFile(PATH_SAMPLE_TEST, 'utf-8', function (err, content) {
    if (err) {
      return EMPTY_STRING;
    }
    return "d";
  });
}

describe('Scraper', function() {

  var content = loadSampleHTML()
  describe("loadSampleHTML()", function() {
    it('load the sample html page', function() {
      expect(content).to.not.equal(EMPTY_STRING);
    });
  })

  var scraper = new Scraper(content);

  describe('#getContent()', function() {
    var scraper_with_no_content = new Scraper();
    it('should return empty string if no content', function() {
      assert.equal(EMPTY_STRING, scraper_with_no_content.getContent());
    });
    it('should return the html content', function() {
      assert.equal(scraper.getContent(), EMPTY_STRING);
    });
  });

});
