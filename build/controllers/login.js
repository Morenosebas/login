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
exports.comparePassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mysql_1 = __importDefault(require("../services/mysql"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password)
            throw new Error("Username and password are required");
        const selectResult = yield mysql_1.default.query("SELECT * FROM  users WHERE `username` = ? LIMIT 1", [username]);
        const user = selectResult[0][0];
        if (!user || !user.password) {
            throw new Error("User not found");
        }
        const isMatch = comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials");
        }
        const SECRET = process.env.SECRET_KEY;
        const token = jsonwebtoken_1.default.sign({ id: user.id, username }, SECRET, {
            expiresIn: "1h",
        });
        res.cookie("x-auth-token", token, { httpOnly: true });
        delete user.password;
        return res.json({ token, user });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ error: error.message });
    }
});
function comparePassword(password, hash) {
    const isMatch = bcrypt_1.default.compareSync(password, hash);
    return isMatch;
}
exports.comparePassword = comparePassword;
exports.default = { login };
