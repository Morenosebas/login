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
exports.encryptText = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const mysql_1 = __importDefault(require("../services/mysql"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const encryptedPassword = encryptText(password);
        if (!username || !password)
            throw new Error("Username and password are required");
        if (!encryptedPassword)
            throw new Error("Error encrypting password");
        const insertResult = yield mysql_1.default.query("INSERT INTO users (username,password) VALUES (?,?)", [username, encryptedPassword]);
        const selectResult = yield mysql_1.default.query("SELECT * FROM users WHERE `username` = ?", [username]);
        const user = selectResult[0];
        if (!user) {
            throw new Error("Error creating user");
        }
        return res.json({ username, password: encryptedPassword });
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(500).json({ error: error.message });
    }
});
function encryptText(password) {
    const salt = bcrypt_1.default.genSaltSync(10);
    const hash = bcrypt_1.default.hashSync(password, salt);
    return hash;
}
exports.encryptText = encryptText;
exports.default = { signup };
