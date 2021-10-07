import dotenv from "dotenv";
import path from "path";
import express from "express";
import exphbs from "express-handlebars";
import connectDB from "./config/db";
import log, { expressLogger } from "./logger";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(expressLogger);
app.use(express.static("public"));

// Handlebars
app.engine(
  "hbs",
  exphbs({
    layoutsDir: path.join(__dirname, "views", "layouts"),
    extname: ".hbs",
  })
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", ".hbs");

// Routes
app.use("/", routes);

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
