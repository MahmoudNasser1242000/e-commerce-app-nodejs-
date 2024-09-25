import {Router} from "express";
import { addUser, deleteUser, getAllUsers, getSpecificUser, updateUser } from "./user.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addUserSchema, userIdSchema, updateUserSchema } from "./user.validation.js";
import checkUserId from "../../middlewares/checkUserId.js";
import productRouter from "../product/product.routes.js";
import checkUserEmailExist from "../../middlewares/checkUserEmailExist.js";

const userRouter = Router();

userRouter.use("/:user/products", checkUserId, productRouter)
userRouter.use("/:user/users", checkUserId, productRouter)
userRouter.use("/:user/categories", checkUserId, productRouter)
userRouter.use("/:user/subCategories", checkUserId, productRouter)
userRouter.use("/:user/coupons", checkUserId, productRouter)
userRouter.use("/:user/reviews", checkUserId, productRouter)

userRouter.route("/")
    .post(
        uploadSingle("profileImg"),
        schemaValidation(addUserSchema),
        checkUserEmailExist,
        addUser
    )
    .get(
        getAllUsers
    )

userRouter.route("/:userId")
    .get(
        schemaValidation(userIdSchema),
        getSpecificUser
    )
    .patch(
        uploadSingle("profileImg"),
        schemaValidation(updateUserSchema),
        updateUser
    )
    .delete(
        schemaValidation(userIdSchema),
        deleteUser
    )
export default userRouter;