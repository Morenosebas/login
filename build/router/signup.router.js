"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = __importDefault(require("../controllers/signup"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/signup", signup_1.default.signup);
module.exports = router;
