import { Router } from "express";
import userRouter from "./userRoutes.mjs";

const router = Router();
router.use('/user',userRouter);

export default router;