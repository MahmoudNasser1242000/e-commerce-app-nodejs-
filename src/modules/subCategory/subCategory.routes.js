import {Router} from "express";
import { addSubCategorey, getAllSubCategories, getSpecificSubCategory } from "./subCategory.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories)

subCategoryRouter.post("/:categoryId", checkCategoryId, addSubCategorey)

subCategoryRouter.route("/:subCategoryId")
    .get(
        getSpecificSubCategory
    )

export default subCategoryRouter;