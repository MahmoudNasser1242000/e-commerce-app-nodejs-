import { Router } from "express";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { changePassword, signIn, signUp } from "./auth.controller.js";
import { changePasswordSchema, signInSchema, signUpSchema } from "./auth.validation.js";
import checkUserEmailExist from "../../middlewares/checkUserEmailExist.js";
import protectAuth from "../../middlewares/protectAuth.js";

const authRouter = Router();

authRouter.post(
    "/signUp",
    uploadSingle("profileImg"),
    schemaValidation(signUpSchema),
    checkUserEmailExist,
    signUp
)

authRouter.post(
    "/signIn",
    schemaValidation(signInSchema),
    signIn
)

authRouter.patch(
    "/changePassword",
    protectAuth,
    schemaValidation(changePasswordSchema),
    changePassword
)
export default authRouter;