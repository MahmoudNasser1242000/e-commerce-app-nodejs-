import { Router } from "express";
import {
    addCategorey,
    deleteCategory,
    getAllCategories,
    getSpecificCategory,
    updateCategory,
} from "./category.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import {
    addCategorySchema,
    categoryIdSchema,
    updateCategorySchema,
} from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import productRouter from "../product/product.routes.js";
import protectAuth from "../../middlewares/protectAuth.js";
import roleAccess from "../../middlewares/RoleAccess.js";
import checkCategoryName from "../../middlewares/checkCategoryName.js";

const categoryRouter = Router({mergeParams: true});

categoryRouter.use(
    "/:category/subCategories",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(categoryIdSchema),
    checkCategoryId,
    subCategoryRouter
);
categoryRouter.use(
    "/:category/products",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(categoryIdSchema),
    checkCategoryId,
    productRouter
);

categoryRouter
    .route("/")
    .post(
        protectAuth,
        roleAccess("admin"),
        uploadSingle("img"),
        schemaValidation(addCategorySchema),
        checkCategoryName,
        addCategorey
    )
    .get(protectAuth, getAllCategories);

categoryRouter
    .route("/:category")
    .get(protectAuth, schemaValidation(categoryIdSchema), checkCategoryId, getSpecificCategory)
    .patch(
        protectAuth,
        roleAccess("admin"),
        uploadSingle("img"),
        schemaValidation(updateCategorySchema),
        checkCategoryId,
        checkCategoryName,
        updateCategory
    )
    .delete(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(categoryIdSchema),
        checkCategoryId,
        deleteCategory
    );
export default categoryRouter;
