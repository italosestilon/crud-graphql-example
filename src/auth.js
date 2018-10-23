import jwt from "jsonwebtoken";
import User from "./models/user";

export async function getUser(token) {
  if (!token) {
    return { user: null };
  }

  try {
    const decoded = jwt.verify(token.substring(4), process.env.JWT_KEY);
    const user = await User.findById(decoded.id);

    return {
      user
    };
  } catch (err) {
    console.error(err);
    return {
      user: null
    };
  }
}

export function generateToken(user) {
  return `JWT ${jwt.sign({ id: user.id }, process.env.JWT_KEY)}`;
}
