import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  console.log("✅ MongoDB connected successfully (serverless)");
  return cached.conn;
};
