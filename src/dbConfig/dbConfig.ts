// import mongoose from "mongoose";

// export async function connect() {
//   try {
//     mongoose.connect(process.env.MONGO_URI!);
//     const connection = mongoose.connection;

//     connection.on("connected", () => {
//       console.log("MongoDB connected successfully");
//     });

//     connection.on("error", (err) => {
//       console.log(
//         "MongoDB connection error. Please make sure MongoDB is running. " + err
//       );
//       process.exit();
//     });
//   } catch (error) {
//     console.log("Something goes wrong!");
//     console.log(error);
//   }
// }

import _mongoose, { connect } from "mongoose";

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null;
    conn: typeof _mongoose | null;
  };
}

// const MONGODB_URI = "mongodb://127.0.0.1:27017/coursesDB";

//LocalHost URI Link
const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI || MONGODB_URI.length === 0) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    console.log("🚀 Using cached connection");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = connect(MONGODB_URI!, opts)
      .then((mongoose) => {
        console.log("✅ New connection established");
        return mongoose;
      })
      .catch((error) => {
        console.error("❌ Connection to database failed");
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
