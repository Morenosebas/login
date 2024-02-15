import LogOutController from "../controllers/logout";
import { Router } from "express";

const router = Router();

router.post("/logout", LogOutController.logout);

module.exports = router;
