const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Data
const productPath = path.join(__dirname, '../config/products.js');
const dataPath = path.join(__dirname, '../../public/data/data.json');
const PRODUCTS = require(productPath);
const DATA = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Get title, imageURL, and price for an item
const getItemInfo = async (entry, webPage) => {
  const entryUrl = entry[1];

  try {
    await webPage.goto(entryUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await webPage.waitForSelector('#productTitle',{timeout: 60000});
    const title = await webPage.$eval('#productTitle', (el) => el.textContent.trim());
    const priceDollar = await webPage.$eval('.a-price-whole', (el) => el.textContent.trim());
    const priceCents = await webPage.$eval('.a-price-fraction', (el) => el.textContent.trim());
    const price = priceDollar.concat(priceCents);
    const imageURL = await webPage.$eval('#landingImage', (el) => el.src);

    return [title, imageURL, price];

  } catch (err) {
    console.log("Get network failed! \n", err);
  }
};

const scraper = async (products) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  const newDATA = {};

  try {

    for (const [rType, item] of Object.entries(products)) {

      if (rType === 'default') {

        for (const entry of Object.entries(item)) {
          const result = await getItemInfo(entry, page);

          if (!result) {
            console.warn(`Skipping ${entry[0]} — scrape failed`);
            continue;
          }
          const [title, url, price] = result;
          const newName = entry[0];
          const today = new Date().toISOString();
          const latest = today.slice(0, 10);
          const newest = DATA[newName]?.history[DATA[newName].history.length - 1]?.date?.slice(0, 10);
          const prevHistory = DATA[newName]?.history || [];

          if (newest !== latest) {
            newDATA[newName] = {
              title,
              url,
              history: [
                ...prevHistory,
                {
                  date: latest,
                  price: price,
                },
              ],
            };
          } else {
            console.log('Skip because I already ran today!');
          }
        }
      }
    }

    // Copy new data
    const mergedData = { ...DATA };

    for (const [key, value] of Object.entries(newDATA)) {
      mergedData[key] = {
        ...DATA[key] || {},
        ...value
      }
    }


  // Write out
  fs.writeFileSync(
    dataPath,
    JSON.stringify(mergedData, null, 2),
    'utf-8'
  );
  } catch (err) {
      console.log(err);
  } finally {

      await browser.close();
  }
};

scraper(PRODUCTS);
