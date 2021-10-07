import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";

dotenv.config();
const app = express();

const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`StoryBooks running on localhost:${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};
start();
