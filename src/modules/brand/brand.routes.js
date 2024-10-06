import {Router} from "express";
import { addBrand, deleteBrand, getAllBrands, getSpecificBrand, updateBrand } from "./brand.controller.js";
import { uploadSingle } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addBrandSchema, brandIdSchema, updateBrandSchema } from "./brand.validation.js";
import checkBrandId from "../../middlewares/checkBrandId.js";
import productRouter from "../product/product.routes.js";
import protectAuth from "../../middlewares/protectAuth.js";
import checkBrandName from "../../middlewares/checkBrandName.js";
import roleAccess from "../../middlewares/RoleAccess.js";

const brandRouter = Router({mergeParams: true});

brandRouter.use("/:brand/products", protectAuth, checkBrandId, productRouter)

brandRouter.route("/")
    .post(
        protectAuth,
        roleAccess("admin"),
        uploadSingle("brands", "logo"),
        schemaValidation(addBrandSchema),
        checkBrandName,
        addBrand
    )
    .get(
        protectAuth,
        getAllBrands
    )

brandRouter.route("/:brand")
    .get(
        protectAuth,
        schemaValidation(brandIdSchema),
        checkBrandId,
        getSpecificBrand
    )
    .patch(
        protectAuth,
        roleAccess("admin"),
        uploadSingle("brands", "logo"),
        schemaValidation(updateBrandSchema),
        checkBrandId,
        checkBrandName,
        updateBrand
    )
    .delete(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(brandIdSchema),
        checkBrandId,
        deleteBrand
    )
export default brandRouter;