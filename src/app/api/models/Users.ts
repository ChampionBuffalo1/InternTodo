import { User } from "@types";
import { Schema, model } from "mongoose";

const userSchema = new Schema<User>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "User must have an email"],
    },
    username: {
      type: String,
      required: [true, "User must have a name"],
    },
  },
  {
    timestamps: true,
  }
);

export default model<User>("Users", userSchema);
