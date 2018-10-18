import jwt from "jsonwebtoken";
import config from "config";
import User from "./models/user";

export async function getUser(token) {
  if(!token) {
    return {user: null}
  };

  try {
    const decoded = jwt.verify(token.substring(4), config.jwtSecret);
    const user = await User.FindById(decoded.id);

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
  return `JWT ${jwt.sign({ id: user.id }, config.jwtSecret)}`;
}
