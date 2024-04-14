import { Router } from "express";
import { signin, signup } from "../controllers/auth.controllers";

const router = Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);

export default router;
