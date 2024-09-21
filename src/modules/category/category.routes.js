import {Router} from "express";
import { addCategorey, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addCategorySchema, categoryIdSchema, updateCategorySchema } from "./category.validation.js";

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
        schemaValidation(categoryIdSchema),
        getSpecificCategory
    )
    .patch(
        uploadSingle("img"),
        schemaValidation(updateCategorySchema),
        updateCategory
    )
    .delete(
        schemaValidation(categoryIdSchema),
        deleteCategory
    )
export default categoryRouter;