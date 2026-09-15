require('dotenv').config();
const mongoose = require('mongoose');
const createApp = require('./app');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mrn_portfolio';

async function main() {
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
  const app = createApp();
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
