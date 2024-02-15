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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mysql_1 = __importDefault(require("../services/mysql"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
        const selectResult = yield mysql_1.default.query("SELECT id,username FROM users ");
        const users = selectResult[0];
        if (!users) {
            throw new Error("Error creating user");
        }
        return res.json({ users });
    }
    catch (error) {
        res.clearCookie("x-auth-token");
        if (error instanceof Error)
            return res.status(500).json({ error: error.message });
    }
});
exports.default = { getUsers };
