var assert = require('assert');
var moniker = require('moniker');

describe('Smoke: create listing', function() {
  it('should not allow listing creation when unauthed', function () {
    browser.url('/listings/new');
    browser
      .waitUntil(function() {
        return (!browser.getUrl().endsWith('/listings/new'));
      }, 5000, 'expected page to unload');
    assert.equal(browser.getUrl().startsWith('https://rjspotter-atmedia.auth0.com/login'), true);
  });

  it('creates a listing with all fields', function () {
    browser.login();
    browser
      .url('/listings/new')
      .waitForExist('[data-test="listing-form-submit"]');

    browser
      .selectByValue('[data-test="listing-publishedStateId-input"]', "PUBLISHED")
      .setValue('[data-test="listing-title-input"]', "AUTOTEST - Create Listing - " + moniker.choose())
      .setValue('[data-test="listing-body-input"]', "Some juicy juicy details")
      .setValue('[data-test="listing-price-input"]', 123)
      .selectByValue('[data-test="listing-priceOptionId-input"]', "PER_EACH")
      .click('[data-test="listing-shippingOptionsIds-input-LOCAL_DELIVERY"]')
      .click('[data-test="listing-shippingOptionsIds-input-DOMESTIC_SHIPPING"]')
      .setValue('[data-test="listing-shippingDetails-input"]', "No shipping to Indiana")
      .click('[data-test="listing-locationPrivacy-input"]')
      .click('[data-test="listing-form-submit"]')
      .waitForVisible('[data-test="listing-success-message"]');
  });
});
