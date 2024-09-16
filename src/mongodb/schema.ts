import { Schema, model } from "mongoose";
import type { IUser } from "../types";

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
}, { timestamps: true });

const User = model('users', userSchema);

export { User };
