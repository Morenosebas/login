import { Response, type Request } from "express";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import connection from "../services/mysql";
import type { User } from "../entities/server";
import { RowDataPacket } from "mysql2";
interface controller {
  logout: (
    req: Request<{}, {}, { username: string; password: string }>,
    res: Response
  ) => Promise<Response<any, Record<string, any>> | undefined>;
}

const logout: controller["logout"] = async (req, res) => {
  try {
    res.clearCookie("x-auth-token");
    return res.json({ message: "User logged out" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(500).json({ error: error.message });
  }
};
export default { logout };
