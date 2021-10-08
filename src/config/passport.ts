import { PassportStatic } from "passport";
import { Strategy } from "passport-google-oauth2";
import User from "../models/userModel";
import { GoogleProfile } from "../types";

declare global {
  namespace Express {
    interface User {
      _id?: number;
    }
  }
}

export const initPassport = (passport: PassportStatic) => {
  const { GOOGLE_CLIENT_ID, GOOGLE_SECRET } = process.env;
  if (GOOGLE_CLIENT_ID && GOOGLE_SECRET) {
    const GoogleStrategy = new Strategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile: GoogleProfile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.photos[0].value,
        };

        try {
          let exisitingUser = await User.findOne({ googleId: profile.id });
          let user = exisitingUser ?? (await User.create(newUser));
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    );

    passport.use("google", GoogleStrategy);

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        user ? done(null, user?._id) : done(null, false);
      } catch (error) {
        done(error);
      }
    });
  } else {
    console.error("🧧 Auth variables not provided");
    process.exit(1);
  }
};
