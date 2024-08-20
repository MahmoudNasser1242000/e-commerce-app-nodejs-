import {Router} from "express";
import { addBrand } from "./brand.controller.js";

const brandRouter = Router();

brandRouter.route("/")
    .post(
        addBrand
    )
export default brandRouter;