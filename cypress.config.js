const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://192.168.10.75',
  },
  fixturesFolder: false,
  video: false,
})
