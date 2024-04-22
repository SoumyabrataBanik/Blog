import { Router } from "express";
import {
    deleteUser,
    testFunction,
    updateUser,
} from "../controllers/user.controllers";
import { verifyToken } from "../utils/verifyUser";

const router = Router();

router.get("/test", testFunction);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);

export default router;
