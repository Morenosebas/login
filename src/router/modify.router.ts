import ModifyController from "../controllers/modifyUser";
import { Router } from "express";

const router = Router();

router.post(
  "/:id/modify",

  ModifyController.modify
);

module.exports = router;
