var assert = require('assert');

describe('Header', function() {
  it('should render the core elements', function () {
    assert.equal(browser.isExisting('[data-test="pageHeader-howItWorks"]'), true);
    assert.equal(browser.isVisible('[data-test="pageHeader-howItWorks"]'), true);

    assert.equal(browser.isExisting('[data-test="pageHeader-myPicks"]'), true);
    assert.equal(browser.isVisible('[data-test="pageHeader-myPicks"]'), true);

    assert.equal(browser.isExisting('[data-test="pageHeader-createAListing"]'), true);
    assert.equal(browser.isVisible('[data-test="pageHeader-createAListing"]'), true);
  });

  describe('Unauthed', function() {
    it('should render non-authed-only components', function() {
      assert.equal(browser.isExisting('[data-test="pageHeader-join"]'), true);
      assert.equal(browser.isVisible('[data-test="pageHeader-join"]'), true);

      assert.equal(browser.isExisting('[data-test="pageHeader-signIn"]'), true);
      assert.equal(browser.isVisible('[data-test="pageHeader-signIn"]'), true);
    });

    it('should not render authed-only components', function() {
      assert.equal(browser.isExisting('[data-test="pageHeader-messages"]'), false);

      assert.equal(browser.isExisting('[data-test="pageHeader-userMenu"]'), false);
    });

    it('should render sign in links for authed components', function() {
      assert.equal(browser.getAttribute('[data-test="pageHeader-createAListing"]', 'href'), 'http://localhost:3100/sign-in?to=/listings/new');

      // assert.equal(browser.getAttribute('[data-test="pageHeader-myPicks"]', 'href'), 'http://localhost:3100/sign-in?to=/my-picks');
    });
  });

  describe('Authed', function() {
    it('should render authed-only components', function() {
      browser.login('pageHeader');

      assert.equal(browser.isExisting('[data-test="pageHeader-messages"]'), true);

      assert.equal(browser.isExisting('[data-test="pageHeader-userMenu"]'), true);
    });

    it('should not render non-authed-only components', function() {
      assert.equal(browser.isExisting('[data-test="pageHeader-join"]'), false);

      assert.equal(browser.isExisting('[data-test="pageHeader-signIn"]'), false);
    });

    it('should render real links for authed components', function() {
      assert.equal(browser.getAttribute('[data-test="pageHeader-createAListing"]', 'href'), 'http://localhost:3100/listings/new');

      assert.equal(browser.getAttribute('[data-test="pageHeader-myPicks"]', 'href'), 'http://localhost:3100/my-picks');
    });
  });
});
