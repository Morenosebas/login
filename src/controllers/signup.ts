import { Response, type Request } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import connection from "../services/mysql";
interface controller {
  signup: (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => Promise<Response<any, Record<string, any>> | undefined>;
}

const signup: controller["signup"] = async (req, res) => {
  try {
    const { username, password } = req.body;
    const encryptedPassword = encryptText(password);
    if (!username || !password)
      throw new Error("Username and password are required");
    if (!encryptedPassword) throw new Error("Error encrypting password");
    const insertResult = await connection.query(
      "INSERT INTO users (username,password) VALUES (?,?)",
      [username, encryptedPassword]
    );

    const selectResult = await connection.query(
      "SELECT * FROM users WHERE `username` = ?",
      [username]
    );
    const user = selectResult[0];
    if (!user) {
      throw new Error("Error creating user");
    }
    return res.json({ username, password: encryptedPassword });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};

export function encryptText(password: string) {
  const salt = bycrypt.genSaltSync(10);
  const hash = bycrypt.hashSync(password, salt);
  return hash;
}

export default { signup };
