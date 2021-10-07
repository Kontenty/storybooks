import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
import log, { expressLogger } from "./logger";

dotenv.config();
const app = express();
app.use(expressLogger);

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    await connectDB();
    app.listen(PORT, () => {
      log.info(`StoryBooks running on localhost:${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};
start();
