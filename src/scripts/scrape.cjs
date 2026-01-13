const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Data
const productPath = path.join(__dirname, '../config/products.js');
const dataPath = path.join(__dirname, '../../public/data/data.json');
const PRODUCTS = require(productPath);
const DATA = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Get title, imageURL, and price for an item
const getItemInfo = async (entry) => {
  const entryUrl = entry[1];

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();

  try {
    await page.goto(entryUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('#productTitle',{timeout: 60000});
    const title = await page.$eval('#productTitle', (el) => el.textContent.trim());
    const priceDollar = await page.$eval('.a-price-whole', (el) => el.textContent.trim());
    const priceCents = await page.$eval('.a-price-fraction', (el) => el.textContent.trim());
    const price = priceDollar.concat(priceCents);
    const imageURL = await page.$eval('#landingImage', (el) => el.src);

    return [title, imageURL, price];
  } catch (err) {
    console.log(err);
  } finally {
    await browser.close();
  }
};

const scraper = async (products) => {
  const newDATA = {};
  try {
    for (const item of Object.entries(products)) {
      if (item[0] === 'default') {
        for (const entry of Object.entries(item[1])) {
          const result = await getItemInfo(entry);
          if (!result) {
            console.warn(`Skipping ${entry[0]} — scrape failed`);
            continue;
          }
          const [title, url, price] = result;
          const newName = entry[0];
          const today = new Date().toISOString();
          const latest = today.slice(0, 10);
          const newest = DATA[newName]?.history[0]?.date?.slice(0, 10);
          const prevHistory = DATA[newName]?.history || [];

          if (newest !== latest) {
            newDATA[newName] = {
              title,
              url,
              history: [
                {
                  date: latest,
                  price: price,
                },
                ...prevHistory,
              ],
            };

            fs.writeFileSync(
              dataPath,
              JSON.stringify({ ...DATA, ...newDATA }, null, 2),
              'utf-8'
            );
          } else {
            console.log('Skip because I already ran today!');
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

scraper(PRODUCTS);
