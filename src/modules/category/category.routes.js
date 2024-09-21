import {Router} from "express";
import { addCategorey, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addCategorySchema } from "./category.validation.js";

const categoryRouter = Router();

categoryRouter.route("/")
    .post(
        uploadSingle("img"),
        schemaValidation(addCategorySchema),
        addCategorey
    )
    .get(
        getAllCategories
    )

categoryRouter.route("/:categoryId")
    .get(
        getSpecificCategory
    )
    .patch(
        uploadSingle("img"),
        schemaValidation(addCategorySchema),
        updateCategory
    )
    .delete(
        deleteCategory
    )
export default categoryRouter;