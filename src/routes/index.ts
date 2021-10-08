import express from "express";
import authRoute from "./authRoute";
import { ensureAuth, ensureGuest } from "../midlleware/authMiddleware";
const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
  res.render("login", { layout: "login" });
});
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard");
});
router.use("/auth", authRoute);

export default router;
