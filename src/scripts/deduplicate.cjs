const fs = require('fs');
const path = require('path');

// Data
const dataPath = path.join(__dirname, '../../public/data/data.json');
const DATA = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

console.log("Deduplicationg running...");

for (const [, {history}] of Object.entries(DATA)) {
  const flattenedHistory = history.flat(Infinity);
  const newHist = new Set();
  const deduped = flattenedHistory
    .filter(entry => {
      if (newHist.has(entry.date)) return false;
      newHist.add(entry.date);
      return true;
    });
  deduped.sort((a,b) => Date.parse(a.date) - Date.parse(b.date));
  history.length = 0;
  history.push(...deduped);
  console.log("Check Data!!!"); // LOG
  console.log(deduped); // LOG
}


fs.writeFileSync(
  dataPath,
  JSON.stringify({ ...DATA}, null, 2),
  'utf-8'
);