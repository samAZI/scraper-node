var Scraper = require('../app/scraper')
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

const fs = require('fs');

const EMPTY_STRING = ''
const PATH_SAMPLE_TEST = './sample_page_test.html'

describe('Scraper', function() {

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
