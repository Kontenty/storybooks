import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import log from "../logger";

const connectMongoose = async (mongoUrl: string) => {
  try {
    const conn = await mongoose.connect(mongoUrl);
    log.info(`MongoDB connected: ${conn.connection.host}`);
    const client = conn.connection.getClient();
    return client;
  } catch (error) {
    log.error("Mongoose connect failed");
    console.error(error);
    process.exit(1);
  }
};

const connectDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;
  if (MONGO_URL) {
    await connectMongoose(MONGO_URL);

    const store = MongoStore.create({
      mongoUrl: MONGO_URL,
    });

    return store;
  } else {
    log.error("DB url not provided");
    process.exit(1);
  }
};

export default connectDB;
