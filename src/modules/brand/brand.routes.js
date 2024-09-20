import {Router} from "express";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";

const brandRouter = Router();

brandRouter.route("/")
    .post(
        uploadSingle("logo"),
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