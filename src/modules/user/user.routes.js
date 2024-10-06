import { Router } from "express";
import {
    addUser,
    deleteUser,
    getAllUsers,
    getSpecificUser,
    updateUser,
} from "./user.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import {
    addUserSchema,
    userIdSchema,
    updateUserSchema,
    createdBySchema,
} from "./user.validation.js";
import checkUserId from "../../middlewares/checkUserId.js";
import productRouter from "../product/product.routes.js";
import checkUserEmailExist from "../../middlewares/checkUserEmailExist.js";
import protectAuth from "../../middlewares/protectAuth.js";
import roleAccess from "../../middlewares/RoleAccess.js";
import brandRouter from "../brand/brand.routes.js";
import categoryRouter from "../category/category.routes.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import reviewRoter from "../review/review.routes.js";
import couponRoter from "../coupon/coupon.routes.js";

const userRouter = Router();

userRouter.use(
    "/:createdBy/products",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(createdBySchema),
    checkUserId,
    productRouter
);
userRouter.use(
    "/:createdBy/brands",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(createdBySchema),
    checkUserId,
    brandRouter
);
userRouter.use(
    "/:createdBy/categories",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(createdBySchema),
    checkUserId,
    categoryRouter
);
userRouter.use(
    "/:createdBy/subCategories",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(createdBySchema),
    checkUserId,
    subCategoryRouter
);
userRouter.use(
    "/:createdBy/reviews",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(createdBySchema),
    checkUserId,
    reviewRoter
);
userRouter.use(
    "/:createdBy/coupons",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(createdBySchema),
    checkUserId,
    couponRoter
);

userRouter
    .route("/")
    .post(
        protectAuth,
        roleAccess("admin"),
        uploadSingle("user", "profileImg"),
        schemaValidation(addUserSchema),
        checkUserEmailExist,
        addUser
    )
    .get(protectAuth, roleAccess("admin"), getAllUsers);

userRouter
    .route("/:user")
    .get(protectAuth, roleAccess("admin"), schemaValidation(userIdSchema), checkUserId, getSpecificUser)
    .patch(
        protectAuth,
        uploadSingle("user", "profileImg"),
        schemaValidation(updateUserSchema),
        checkUserEmailExist,
        checkUserId,
        updateUser
    )
    .delete(protectAuth, schemaValidation(userIdSchema), checkUserId, deleteUser);
export default userRouter;
