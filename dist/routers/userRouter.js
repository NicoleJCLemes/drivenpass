import { Router } from "express";
import { signUp, signIn } from "../controllers/userController.js";
import { userValidation } from "../middlewares/schemasValidation.js";
var userRouter = Router();
userRouter.post("/sign-up", userValidation, signUp);
userRouter.post("/sign-in", userValidation, signIn);
export default userRouter;
