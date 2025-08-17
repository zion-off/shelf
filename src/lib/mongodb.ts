import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var, @typescript-eslint/no-explicit-any
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
    // Optimized for Vercel serverless functions
    const opts = { 
      bufferCommands: false, // Don't buffer commands if not connected
      maxPoolSize: 1, // Limit connection pool for serverless
      serverSelectionTimeoutMS: 5000, // Fast timeout for serverless
      socketTimeoutMS: 10000, // Shorter socket timeout
      family: 4 // Use IPv4, skip trying IPv6
    };
    cached.promise = mongoose.connect(MONGODB_URI, opts);
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
