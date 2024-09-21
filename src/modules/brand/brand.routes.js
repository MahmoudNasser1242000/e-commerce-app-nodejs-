import {Router} from "express";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addBrandSchema, brandIdSchema, updateBrandSchema } from "./brand.validation.js";

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
        schemaValidation(brandIdSchema),
        getSpecificBrand
    )
    .patch(
        uploadSingle("logo"),
        schemaValidation(updateBrandSchema),
        updateBrand
    )
    .delete(
        schemaValidation(brandIdSchema),
        deleteBrand
    )
export default brandRouter;