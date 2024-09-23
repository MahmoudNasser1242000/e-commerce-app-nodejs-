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

const subCategoryRouter = Router();

subCategoryRouter.route("/")
    .get(getAllSubCategories)
    .post(
        schemaValidation(addSubCategorySchema),
        checkCategoryId,
        addSubCategorey
    );

subCategoryRouter
    .route("/:subCategoryId")
    .get(schemaValidation(subCategoryIdSchema), getSpecificSubCategory)
    .patch(schemaValidation(updateSubCategorySchema), updateSubCategory)
    .delete(schemaValidation(subCategoryIdSchema), deleteSubCategory);

export default subCategoryRouter;
