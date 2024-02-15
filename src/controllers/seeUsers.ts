import { Response, type Request } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import connection from "../services/mysql";
import type { User } from "../entities/server";
import { RowDataPacket } from "mysql2";
interface controller {
  getUsers: (
    req: Request,
    res: Response
  ) => Promise<Response<any, Record<string, any>> | undefined>;
}

const getUsers: controller["getUsers"] = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies["x-auth-token"]) {
      throw new Error("No cookies found, refresh session.");
    }
    const token = cookies["x-auth-token"];
    const SECRET = process.env.SECRET_KEY as string;
    const decoded = jwt.verify(token, SECRET);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    const selectResult = await connection.query(
      "SELECT id,username FROM users "
    );
    const users = (selectResult as RowDataPacket[])[0] as User[];
    if (!users) {
      throw new Error("Error creating user");
    }
    return res.json({ users });
  } catch (error) {
    res.clearCookie("x-auth-token");
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};

export default { getUsers };
