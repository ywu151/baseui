/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-env node */
/* eslint-disable flowtype/require-valid-file-annotation */

const scenarios = require('./examples-list');
const {goToUrl} = require('../../e2e/helpers');

const suite = 'Modal Test Suite';

const selectors = {
  closeButton: 'button[aria-label="Close"]',
  openModal: '.open-modal-button',
  dialog: '[role="dialog"]',
};

module.exports = {
  afterEach: function(client, done) {
    client.notifySauceLabs(done);
  },
  [scenarios.SIMPLE_EXAMPLE]: function(client) {
    goToUrl({
      suite,
      test: scenarios.SIMPLE_EXAMPLE,
      client,
    })
      .initAccessibility()
      .waitForElementVisible('body', 1000)
      // close modal to start fresh
      .click(selectors.closeButton)
      .waitForElementNotPresent(selectors.closeButton, 1000)
      .click(selectors.openModal)
      .waitForElementPresent(selectors.dialog, 1000)
      // dialog should be the focused element
      .assert.hasFocus(selectors.dialog)
      .assert.accessibility('html', {
        rules: {
          'color-contrast': {
            enabled: false,
          },
        },
      })
      // close again
      .click(selectors.closeButton)
      .waitForElementNotPresent(selectors.closeButton, 1000)
      // open button should be in focus
      .assert.hasFocus(selectors.openModal)
      .end();
  },
};
