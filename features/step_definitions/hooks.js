const { defineSupportCode } = require('cucumber');
const fs = require('fs');
const createTestCafe = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');

const DELAY  = 5000;

function createTestFile () {
  fs.writeFileSync('test.js',
    'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

    'fixture("")\n' +

    'test("test", testControllerHolder.capture);');
}

function runTest () {
  let runner = null;

  createTestCafe('localhost', 1337, 1338)
    .then((testController) => {
      runner = testController.createRunner();

      return runner
        .src('./test.js')
        .browsers('chrome')
        .run()
        .catch((error) => {
          console.log(error);
        });
    })
    .then((report) => {
      if (report) {
        console.log(report);
      }
    });
}

defineSupportCode(function ({ registerHandler }) {
  registerHandler('BeforeFeatures', (features, callback) => {
    createTestFile();
    runTest();

    setTimeout(callback, DELAY);
  });

  registerHandler('AfterFeatures', (features, callback) => {
    testControllerHolder.free();
    fs.unlinkSync('test.js');
    setTimeout(callback, DELAY);
  });
});
