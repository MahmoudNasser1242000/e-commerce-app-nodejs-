import {Router} from "express";
import { addProduct, getSpecificProduct, getAllProducts, updateProduct, deleteProduct } from "./product.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import checkSubCategory from "../../middlewares/checkSubCategory.js";
import checkBrandId from "../../middlewares/checkBrandId.js";
import { uploadFields } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addProductSchema, productIdSchema, updateProductSchema } from "./product.validation.js";
import protectAuth from "../../middlewares/protectAuth.js";
import roleAccess from "../../middlewares/RoleAccess.js";

const productRouter = Router({mergeParams: true});

productRouter.route("/")
    .post(
        protectAuth,
        roleAccess("admin"),
        uploadFields("products", [{name: "imgCover", maxCount: 1}, {name: "images", maxCount: 8}]),
        schemaValidation(addProductSchema),
        checkCategoryId,
        checkSubCategory,
        checkBrandId,
        addProduct
    )
    .get(
        protectAuth,
        getAllProducts
    )
    
productRouter.route("/:product")
    .get(
        protectAuth,
        schemaValidation(productIdSchema),
        getSpecificProduct
    )
    .patch(
        protectAuth,
        roleAccess("admin"),
        uploadFields("products", [{name: "imgCover", maxCount: 1}, {name: "images", maxCount: 8}]),
        schemaValidation(updateProductSchema),
        checkCategoryId,
        checkSubCategory,
        checkBrandId,
        updateProduct
    )
    .delete(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(productIdSchema),
        deleteProduct
    )

export default productRouter;