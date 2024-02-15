import { encryptText } from "./signup";
import { comparePassword } from "../controllers/login";
import { Response, type Request } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import connection from "../services/mysql";
import type { User } from "../entities/server";
import { RowDataPacket } from "mysql2";

interface controller {
  modify: (
    req: Request<{ id: string }, {}, { username: string; password: string }>,
    res: Response
  ) => Promise<Response<any, Record<string, any>> | undefined>;
}

const modify: controller["modify"] = async (req, res) => {
  try {
    const { username, password } = req.body;
    const { id } = req.params;
    const cookies = req.cookies;
    if (!cookies["x-auth-token"]) {
      throw new Error("No cookies found, refresh session.");
    }
    const token = cookies["x-auth-token"];
    const SECRET = process.env.SECRET_KEY as string;
    const decoded = jwt.verify(token, SECRET) as User;
    if (!decoded) {
      throw new Error("Invalid token");
    }
    if (!username && !password)
      throw new Error("Username and password are required");
    if (username) {
      const insertResult = await connection.query(
        "UPDATE users SET username = ? WHERE id = ?",
        [username, id]
      );
    }
    if (password) {
      const encryptedPassword = encryptText(password);
      if (!encryptedPassword) throw new Error("Error encrypting password");
      const insertResult = await connection.query(
        "UPDATE users SET password = ? WHERE id = ?",
        [encryptedPassword, id]
      );
    }

    const user = { id: id, username };

    return res.json({ user });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};
export default { modify };
