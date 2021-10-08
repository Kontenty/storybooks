import express from "express";
import authRoute from "./authRoute";
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
router.use("/auth", authRoute);

export default router;
