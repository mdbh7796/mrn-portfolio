// Safe prod refresh: upserts ONLY the About document from seed-data.js.
// Unlike seed.js it never deletes projects, skills, or contact messages.
// Usage (secret stays in your own shell, never committed):
//   $env:MONGO_URI="<copy from Vercel > Settings > Environment Variables>"; npm run seed:about --prefix server
require('dotenv').config();
const mongoose = require('mongoose');
const About = require('./models/About');
const { about } = require('./seed-data');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mrn_portfolio';

async function main() {
  await mongoose.connect(MONGO_URI);
  const doc = await About.findOneAndUpdate({}, about, { upsert: true, new: true, runValidators: true });
  console.log('About refreshed: headline=%j resume=%j', doc.headline, doc.links && doc.links.resume);
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
