import dotenv from "dotenv";
import path from "path";
import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import passport from "passport";
import helmet from "helmet";

import connectDB from "./config/db";
import { initPassport } from "./config/passport";
import log, { expressLogger } from "./logger";
import routes from "./routes";

dotenv.config();
const app = express();
app.use(expressLogger);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(express.json());
app.use(express.static("public"));

initPassport(passport);

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

// Session
(async () => {
  const store = await connectDB();
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "lady fingers",
      resave: false,
      saveUninitialized: true,
      store,
    })
  );

  // Passport

  app.use(passport.initialize());
  app.use(passport.session());
  // Routes
  app.use("/", routes);
})();

const start = async () => {
  const PORT = process.env.PORT || 5000;
  try {
    // connectDB();
    app.listen(PORT, () => {
      log.info(`StoryBooks running on localhost:${PORT}`);
    });
  } catch (err) {
    process.exit(1);
  }
};
start();
