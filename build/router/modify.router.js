"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const modifyUser_1 = __importDefault(require("../controllers/modifyUser"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/:id/modify", modifyUser_1.default.modify);
module.exports = router;
