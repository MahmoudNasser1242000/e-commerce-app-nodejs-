import {Router} from "express";
import { addCategorey, getAllCategories, getSpecificCategory } from "./category.controller.js";

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

export default categoryRouter;