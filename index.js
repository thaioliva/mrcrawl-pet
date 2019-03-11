const puppeteer = require('puppeteer');

const site = 'https://www.petz.com.br';
const searchBoxSel = 'input#search';
const searchTerms = 'ração seca gatos';
const searchButtonSel = '.btn.btn-buscar';
const resultListSel = '.grid-produtos .liProduct .petzProduct';
const debugMode = {
  headless: false,
  slowMo: 250,
};

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // await page.setViewport({ width: 1366, height: 768});

  await page.goto(site);
  await page.type(searchBoxSel, searchTerms);

  console.log(site);

  await page.waitForSelector(searchButtonSel);
  await page.click(searchButtonSel);

  await page.waitForSelector(resultListSel);

  console.log(resultListSel);

  const products = await page.evaluate(resultListSel => {
    const names = Array.from(document.querySelectorAll(resultListSel));

    return names.map(name => {
      const title = name.childNodes[1].dataset;
      return title;
    });

  }, resultListSel);

  console.log(products);

  await browser.close();
})();
