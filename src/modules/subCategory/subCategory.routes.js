import {Router} from "express";
import { addSubCategorey, deleteSubCategory, getAllSubCategories, getSpecificSubCategory, updateSubCategory } from "./subCategory.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addSubCategorySchema, updateSubCategorySchema } from "./subCategory.validation.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories)

subCategoryRouter.post("/:categoryId", checkCategoryId, schemaValidation(addSubCategorySchema), addSubCategorey)

subCategoryRouter.route("/:subCategoryId")
    .get(
        getSpecificSubCategory
    )
    .patch(
        schemaValidation(updateSubCategorySchema),
        updateSubCategory
    )
    .delete(
        deleteSubCategory
    )

export default subCategoryRouter;