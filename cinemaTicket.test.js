const puppeteer = require("puppeteer");
const { clickElement, getText } = require("./lib/commands.js");
let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("http://qamid.tmweb.ru/client/index.php");
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Cinema ticket purchase tests", () => {
  test("Successful purchase of one ticket for the first movie", async () => {
    await clickElement(page, '[data-time-stamp="1670792400"]');
    await clickElement(page, '[data-seance-id="129"]');
    expect(await getText(page, "h2")).toEqual("Логан");
    await clickElement(page, "div:nth-child(4) > span:nth-child(2)");
    await clickElement(page, ".acceptin-button");
    expect(await getText(page, "h2")).toEqual("Вы выбрали билеты:");
    await clickElement(page, ".acceptin-button");
    expect(await getText(page, "h2")).toEqual("Электронный билет");
  }, 80000);

  test("Failed purchase of the same ticket", async () => {
    await clickElement(page, '[data-time-stamp="1670792400"]');
    await clickElement(page, '[data-seance-id="129"]');
    expect(await getText(page, "h2")).toEqual("Логан");
    await clickElement(page, "div:nth-child(4) > span:nth-child(2)");
    const actual = await page.$eval(".acceptin-button", (link) =>
      link.getAttribute("disabled")
    );
    expect(actual).toEqual("true");
  }, 80000);

  test("Successful purchase of two tickets for the second movie", async () => {
    await clickElement(page, '[data-time-stamp="1670792400"]');
    await clickElement(page, '[data-seance-id="94"]');
    expect(await getText(page, "h2")).toEqual("Фильм 3");
    await clickElement(page, "div:nth-child(1) > span:nth-child(5)");
    await clickElement(page, "div:nth-child(1) > span:nth-child(6)");
    await clickElement(page, ".acceptin-button");
    expect(await getText(page, "h2")).toEqual("Вы выбрали билеты:");
    await clickElement(page, ".acceptin-button");
    expect(await getText(page, "h2")).toEqual("Электронный билет");
  }, 80000);
});
