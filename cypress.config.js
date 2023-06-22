const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://192.168.10.34', //'http://192.168.10.247',
    env:{
      hideCredentials: true,
      snapshotOnly: true,
      requestMode: true
    },
  },
  fixturesFolder: false,
  video: false,
})
