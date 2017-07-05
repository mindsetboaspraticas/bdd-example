const { defineSupportCode } = require('cucumber');
const testControllerHolder = require('./testControllerHolder');

function CustomWorld () {
  this.waitForTestController = testControllerHolder.get;
}

defineSupportCode(({ setWorldConstructor }) => {
  setWorldConstructor(CustomWorld);
});
