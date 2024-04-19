import { Router } from "express";
import { googleAuth, signin, signup } from "../controllers/auth.controllers";

const router = Router();

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.post("/google", googleAuth);

export default router;
