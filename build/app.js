"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/dotenv");
const server_1 = __importDefault(require("./entities/server"));
const server = new server_1.default(3000);
server.start();
