import {Router} from "express";
import { addBrand, getAllBrands } from "./brand.controller.js";

const brandRouter = Router();

brandRouter.route("/")
    .post(
        addBrand
    )
    .get(
        getAllBrands
    )
export default brandRouter;