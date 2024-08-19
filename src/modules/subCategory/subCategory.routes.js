import {Router} from "express";
import { addSubCategorey, getAllSubCategories } from "./subCategory.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories)

subCategoryRouter.route("/:categoryId")
    .post(
        checkCategoryId,
        addSubCategorey
    )

export default subCategoryRouter;