var assert = require('assert');

describe('Smoke: auth', function() {
  it('should log in successfully', function () {
    assert.equal(browser.isExisting('[data-test="pageHeader-userMenu"]'), false);
    browser.login();
    assert.equal(browser.isExisting('[data-test="pageHeader-userMenu"]'), true);
  });

  it('should log out successfully', function () {
    if (!browser.isExisting('[data-test="pageHeader-userMenu"]')) {
      browser.login('[data-test="pageHeader-userMenu"]');
    }
    assert.equal(browser.isExisting('[data-test="pageHeader-userMenu"]'), true);
    browser.logout();
    assert.equal(browser.isExisting('[data-test="pageHeader-userMenu"]'), false);
  });
});
