import {Router} from "express";
import { addCategorey, getAllCategories } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.route("/")
    .post(
        addCategorey
    )
    .get(
        getAllCategories
    )

export default categoryRouter;