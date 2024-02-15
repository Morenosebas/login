"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class Server {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
    }
    start() {
        const App = (0, express_1.default)();
        App.use(express_1.default.json());
        App.use((0, cookie_parser_1.default)());
        App.use((0, morgan_1.default)("dev"));
        App.use("/api", require("../router/signup.router"));
        App.use("/api", require("../router/login.router"));
        App.use("/api", require("../router/logout.router"));
        App.use("/api", require("../router/modify.router"));
        App.use("/api", require("../router/getUsers.router"));
        App.use("", (req, res) => res.send("Welcome to the server!"));
        App.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.default = Server;
