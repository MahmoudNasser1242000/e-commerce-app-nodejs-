import {Router} from "express";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addBrandSchema, updateBrandSchema } from "./brand.validation.js";

const brandRouter = Router();

brandRouter.route("/")
    .post(
        uploadSingle("logo"),
        schemaValidation(addBrandSchema),
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
        uploadSingle("logo"),
        schemaValidation(updateBrandSchema),
        updateBrand
    )
    .delete(
        deleteBrand
    )
export default brandRouter;