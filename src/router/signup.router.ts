import SignUpController from "../controllers/signup";
import { Router } from "express";

const router = Router();

router.post("/signup", SignUpController.signup);

module.exports = router;
