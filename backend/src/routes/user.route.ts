import { Router } from "express";
import { testFunction, updateUser } from "../controllers/user.controllers";
import { verifyToken } from "../utils/verifyUser";

const router = Router();

router.get("/test", testFunction);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
