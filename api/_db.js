// Shared cached MongoDB connection for Vercel serverless functions.
// A new connection per invocation would exhaust Atlas limits — cache on global.
//
// NOTE: we use the exact mongoose instance the shared models were compiled on
// (Model.base). Locally server/ has its own node_modules copy, and mixing two
// mongoose instances causes operations to buffer forever. On Vercel there is a
// single copy (root), so this is consistent in both environments.
const mongoose = require('../server/models/Project').base;

let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

async function db() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = db;
