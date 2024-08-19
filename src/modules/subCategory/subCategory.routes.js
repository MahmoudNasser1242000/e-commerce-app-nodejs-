import {Router} from "express";
import { addSubCategorey, deleteSubCategory, getAllSubCategories, getSpecificSubCategory, updateSubCategory } from "./subCategory.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories)

subCategoryRouter.post("/:categoryId", checkCategoryId, addSubCategorey)

subCategoryRouter.route("/:subCategoryId")
    .get(
        getSpecificSubCategory
    )
    .patch(
        updateSubCategory
    )
    .delete(
        deleteSubCategory
    )

export default subCategoryRouter;