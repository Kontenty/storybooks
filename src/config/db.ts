import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (MONGO_URL) {
    try {
      const conn = await mongoose.connect(MONGO_URL);
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error("Mongoose connect failed");
      console.error(error);
      process.exit(1);
    }
  } else {
    console.log("DB url not provided");
    process.exit(1);
  }
};

export default connectDB;
