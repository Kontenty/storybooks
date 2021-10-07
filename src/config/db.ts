import mongoose from "mongoose";
import log from "../logger";

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (MONGO_URL) {
    try {
      const conn = await mongoose.connect(MONGO_URL);
      log.info(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      log.error("Mongoose connect failed");
      console.error(error);
      process.exit(1);
    }
  } else {
    log.error("DB url not provided");
    process.exit(1);
  }
};

export default connectDB;
