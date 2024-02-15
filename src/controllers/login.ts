import { Response, type Request } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import connection from "../services/mysql";
import type { User } from "../entities/server";
import { RowDataPacket } from "mysql2";
interface controller {
  login: (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => Promise<Response<any, Record<string, any>> | undefined>;
}

const login: controller["login"] = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new Error("Username and password are required");
    const selectResult = await connection.query(
      "SELECT * FROM  users WHERE `username` = ? LIMIT 1",
      [username]
    );
    const user = (selectResult as RowDataPacket[])[0][0] as User;
    if (!user || !user.password) {
      throw new Error("User not found");
    }
    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
    const SECRET = process.env.SECRET_KEY as string;
    const token = jwt.sign({ id: user.id, username }, SECRET, {
      expiresIn: "1h",
    });
    res.cookie("x-auth-token", token, { httpOnly: true });

    delete user.password;
    return res.json({ token, user });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};

export function comparePassword(password: string, hash: string) {
  const isMatch = bycrypt.compareSync(password, hash);
  return isMatch;
}

export default { login };
