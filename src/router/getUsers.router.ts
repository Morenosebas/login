import Users from "../controllers/seeUsers";
import { Router } from "express";

const router = Router();

router.get("/users", Users.getUsers);

module.exports = router;
