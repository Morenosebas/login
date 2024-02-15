import LogInController from "../controllers/login";
import { Router } from "express";

const router = Router();

router.post("/login", LogInController.login);

module.exports = router;
