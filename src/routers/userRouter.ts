import { Router } from "express";
import { signUp, signIn } from "../controllers/userController.js";
import { signUpValidation } from "../middlewares/schemasValidation.js";

const userRouter = Router();

userRouter.post("/sign-up", signUpValidation, signUp);
userRouter.post("/sign-in", signIn);

export default userRouter;