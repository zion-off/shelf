/* eslint-disable */
import mongoose from "mongoose";

declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function mongo() {
  const MONGODB_URI = process.env.MONGODB_URI!;

  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not defined");
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = { bufferCommands: false };
    cached.promise = await mongoose.connect(MONGODB_URI, opts);
    if (process.env.NODE_ENV === "development") {
      cached.promise.connection.db.admin().command({
        setParameter: 1,
        maxTransactionLockRequestTimeoutMillis: 3000,
      });
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default mongo;
