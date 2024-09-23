import {Router} from "express";
import { addCategorey, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addCategorySchema, categoryIdSchema, updateCategorySchema } from "./category.validation.js";
import subCategoryRouter from "../subCategory/subCategory.routes.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import productRouter from "../product/product.routes.js";

const categoryRouter = Router();

categoryRouter.use("/:categoryId/subCategories", checkCategoryId, subCategoryRouter)
categoryRouter.use("/:categoryId/products", checkCategoryId, productRouter)

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