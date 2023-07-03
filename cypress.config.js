const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost', //'http://192.168.10.247',
    env:{
      hideCredentials: true,
      snapshotOnly: true,
      requestMode: true
    },
    experimentalRunAllSpecs: true,
  },
  fixturesFolder: false,
  video: false,
})
