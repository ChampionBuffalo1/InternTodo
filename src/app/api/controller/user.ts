import "@/lib/connect";
import Users from "../models/Users";
import { User } from "@types";

async function createUser(username: string, email: string): Promise<User> {
  const user = new Users({
    username,
    email,
  });
  return await user.save();
}

async function hasUser(username: string, email: string): Promise<boolean> {
  return !!(
    await Users.exists({
      email,
      username,
    })
  )?._id;
}

export { createUser, hasUser };
