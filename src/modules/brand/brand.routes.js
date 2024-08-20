import {Router} from "express";
import { addBrand, getAllBrands, getSpecificBrand } from "./brand.controller.js";

const brandRouter = Router();

brandRouter.route("/")
    .post(
        addBrand
    )
    .get(
        getAllBrands
    )

brandRouter.route("/:brandId")
    .get(
        getSpecificBrand
    )
export default brandRouter;