const { defineSupportCode } = require('cucumber');
const Selector = require('testcafe').Selector;

defineSupportCode(({ Given, When, Then }) => {
  let testController = null;

  Given('I am open Google\'s search page', function () {
    return this.waitForTestController()
      .then((controller) => {
        testController = controller;

        return testController.navigateTo('http://google.com');
      });
  });

  When('I am typing my search request {stringInDoubleQuotes} on Google', (text) => {
    const input = Selector('#lst-ib').with({ boundTestRun: testController });

    return testController.typeText(input, text);
  });

  Then('I am pressing {stringInDoubleQuotes} key on Google', (text) => {
    return testController.pressKey(text);
  });

  Then('I should see that the first Google\'s result is {stringInDoubleQuotes}', (text) => {
    const firstLink = Selector('#rso > div:nth-child(1) > div > div > div > div > h3 > a').with({ boundTestRun: testController });

    return testController.expect(firstLink.innerText).contains(text);
  });
});
