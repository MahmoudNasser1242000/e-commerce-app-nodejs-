import {Router} from "express";
import { addSubCategorey } from "./subCategory.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";

const subCategoryRouter = Router();

subCategoryRouter.route("/:categoryId")
    .post(
        checkCategoryId,
        addSubCategorey
    )

export default subCategoryRouter;