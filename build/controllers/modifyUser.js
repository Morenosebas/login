"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = require("./signup");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysql_1 = __importDefault(require("../services/mysql"));
const modify = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const { id } = req.params;
        const cookies = req.cookies;
        if (!cookies["x-auth-token"]) {
            throw new Error("No cookies found, refresh session.");
        }
        const token = cookies["x-auth-token"];
        const SECRET = process.env.SECRET_KEY;
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        if (!decoded) {
            throw new Error("Invalid token");
        }
        if (!username && !password)
            throw new Error("Username and password are required");
        if (username) {
            const insertResult = yield mysql_1.default.query("UPDATE users SET username = ? WHERE id = ?", [username, id]);
        }
        if (password) {
            const encryptedPassword = (0, signup_1.encryptText)(password);
            if (!encryptedPassword)
                throw new Error("Error encrypting password");
            const insertResult = yield mysql_1.default.query("UPDATE users SET password = ? WHERE id = ?", [encryptedPassword, id]);
        }
        const user = { id: id, username };
        return res.json({ user });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ error: error.message });
    }
});
exports.default = { modify };
