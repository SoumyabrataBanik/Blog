import { Router } from "express";
import { testFunction } from "../controllers/user.controllers";

const router = Router();

router.get("/test", testFunction);

export default router;
