import passport from "passport";
import express from "express";

const router = express.Router();

// Auth with google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);
// Google auth callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
  })
);

// @desc Logout user
// @route GET /auth/logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

export default router;
