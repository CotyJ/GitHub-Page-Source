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

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(entryUrl, { waitUntil: 'networkidle2' });
    await page.waitForSelector('#productTitle');
    const title = await page.$eval('#productTitle', (el) =>el.textContent.trim());
    const priceDollar = await page.$eval('.a-price-whole', (el) =>el.textContent.trim());
    const priceCents = await page.$eval('.a-price-fraction', (el) =>el.textContent.trim());
    const price = priceDollar.concat(priceCents);
    const imageURL = await page.$eval('#landingImage', (el) => el.src);

    return [title, imageURL, price];

  } catch (err) {
    console.log(err);
    throw new err;

  } finally {
    await browser.close();
  }
};

// Loops over each product, updates object, then updates data.JSON
const scraper = async (products) => {
  const newDATA = {};

  // Loop over data set
  for (const item of Object.entries(products)) {
    // first item should be default
    if (item[0] === 'default') {
      // first index is the entry
      for (const entry of Object.entries(item[1])) {
        const [title, url, price] = await getItemInfo(entry);
        const newName = entry[0];
        const today = new Date().toISOString();
        const now = new Date().toUTCString();

        // LOG:
        console.log("Today: ", today);
        console.log("Now: ", now);


        const latest = today.slice(0, 10);
        const newest = DATA[newName]?.history[0]?.date?.slice(0, 10);

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
          console.log('Skip because already ran today!');
        }
      }
    }
  }

  fs.writeFileSync(
    dataPath,
    JSON.stringify({ ...DATA, ...newDATA }, null, 2),
    'utf-8'
  );
};

scraper(PRODUCTS);
