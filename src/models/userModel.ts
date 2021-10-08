import mongoose from "mongoose";
import { User_I } from "../types";

const UserSchema = new mongoose.Schema<User_I>({
  googleId: { type: String, required: true },
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model<User_I>("User", UserSchema);

export default UserModel;
