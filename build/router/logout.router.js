"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logout_1 = __importDefault(require("../controllers/logout"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/logout", logout_1.default.logout);
module.exports = router;
