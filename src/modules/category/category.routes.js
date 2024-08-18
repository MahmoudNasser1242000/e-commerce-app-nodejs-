import {Router} from "express";
import { addCategorey, deleteCategory, getAllCategories, getSpecificCategory, updateCategory } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.route("/")
    .post(
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
        updateCategory
    )
    .delete(
        deleteCategory
    )
export default categoryRouter;