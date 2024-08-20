import {Router} from "express";
import { addBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";

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
    .patch(
        updateBrand
    )
export default brandRouter;