import { Application } from "express";
import passport from "passport";
import passportGoogle from "passport-google-oauth2";

const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;

export const initPassport = (app: Application) => {
  if (GOOGLE_CLIENT_ID && GOOGLE_SECRET) {
    const GoogleStrategy = new passportGoogle.Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {}
    );
    passport.use(GoogleStrategy);

    app.use(passport.initialize());
    app.use(passport.session());
  }
};
