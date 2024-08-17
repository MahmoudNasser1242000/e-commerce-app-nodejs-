import {Router} from "express";
import { addCategorey } from "./category.controller.js";

const categoryRouter = Router();

categoryRouter.route("/")
    .post(
        addCategorey
    )

export default categoryRouter;