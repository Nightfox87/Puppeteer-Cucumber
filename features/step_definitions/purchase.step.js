const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");

setDefaultTimeout(50000);

Before(async function () {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
  });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on cinema page", async function () {
  return await this.page.goto(`https://qamid.tmweb.ru/client/index.php`);
});
When("user chooses day and movie time", async function () {
  await clickElement(this.page, '[data-time-stamp="1670792400"]');
  await clickElement(this.page, '[data-seance-id="129"]');
});
When("user chooses one seat and books it", async function () {
  await clickElement(this.page, "div:nth-child(3) > span:nth-child(3)");
  await clickElement(this.page, ".acceptin-button");
});
When("user clicks booking code butoon", async function () {
  await clickElement(this.page, ".acceptin-button");
});
When("user chooses day and second movie time", async function () {
  await clickElement(this.page, '[data-time-stamp="1670792400"]');
  await clickElement(this.page, '[data-seance-id="94"]');
});
When("user chooses two seats and books them", async function () {
  await clickElement(this.page, "div:nth-child(4) > span:nth-child(1)");
  await clickElement(this.page, "div:nth-child(4) > span:nth-child(2)");
  await clickElement(this.page, ".acceptin-button");
});
Then("user sees {string}", async function (string) {
  expect(await getText(this.page, "h2")).to.equal(string);
});
Then("user sees the button is disabled", async function () {
  const actual = await this.page.$eval(".acceptin-button", (link) =>
    link.getAttribute("disabled")
  );
  expect(actual).to.equal("true");
});
