import {Router} from "express";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addBrandSchema, brandIdSchema, updateBrandSchema } from "./brand.validation.js";
import checkBrandId from "../../middlewares/checkBrandId.js";
import productRouter from "../product/product.routes.js";

const brandRouter = Router();

brandRouter.use("/:brand/products", checkBrandId, productRouter)

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