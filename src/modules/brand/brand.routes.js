import {Router} from "express";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";

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
    .delete(
        deleteBrand
    )
export default brandRouter;