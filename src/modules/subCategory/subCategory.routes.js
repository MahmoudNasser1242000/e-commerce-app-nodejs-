import { Router } from "express";
import {
    addSubCategorey,
    deleteSubCategory,
    getAllSubCategories,
    getSpecificSubCategory,
    updateSubCategory,
} from "./subCategory.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import {
    addSubCategorySchema,
    subCategoryIdSchema,
    updateSubCategorySchema,
} from "./subCategory.validation.js";
import productRouter from "../product/product.routes.js";
import checkSubCategory from "../../middlewares/checkSubCategory.js";
import protectAuth from "../../middlewares/protectAuth.js";
import roleAccess from "../../middlewares/RoleAccess.js";
import checkSubCategoryName from "../../middlewares/checkSubCategoryName.js";

const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter.use(
    "/:subCategory/products",
    protectAuth,
    roleAccess("admin"),
    schemaValidation(subCategoryIdSchema),
    checkSubCategory,
    productRouter
);

subCategoryRouter
    .route("/")
    .get(protectAuth, getAllSubCategories)
    .post(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(addSubCategorySchema),
        checkCategoryId,
        checkSubCategoryName,
        addSubCategorey
    );

subCategoryRouter
    .route("/:subCategory")
    .get(
        protectAuth,
        schemaValidation(subCategoryIdSchema),
        checkSubCategory,
        getSpecificSubCategory
    )
    .patch(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(updateSubCategorySchema),
        checkSubCategory,
        checkCategoryId,
        checkSubCategoryName,
        updateSubCategory
    )
    .delete(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(subCategoryIdSchema),
        checkSubCategory,
        deleteSubCategory
    );

export default subCategoryRouter;
