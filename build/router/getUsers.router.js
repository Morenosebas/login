"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seeUsers_1 = __importDefault(require("../controllers/seeUsers"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/users", seeUsers_1.default.getUsers);
module.exports = router;
