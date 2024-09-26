const { expect } = require('@playwright/test');

async function assertResponseStatus(response, expectedStatus) {
    expect(response.status()).toBe(expectedStatus);
  }
  
  module.exports = { assertResponseStatus };
  