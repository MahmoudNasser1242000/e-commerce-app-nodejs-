import {Router} from "express";
import { addProduct, getSpecificProduct, getAllProducts, updateProduct, deleteProduct } from "./product.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import checkSubCategory from "../../middlewares/checkSubCategory.js";
import checkBrandId from "../../middlewares/checkBrandId.js";
import { uploadFields } from "../../../utils/filesUpload.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addProductSchema, productIdSchema, updateProductSchema } from "./product.validation.js";

const productRouter = Router();

productRouter.route("/")
    .post(
        checkCategoryId,
        checkSubCategory,
        checkBrandId,
        uploadFields([{name: "imgCover", maxCount: 1}, {name: "images", maxCount: 8}]),
        schemaValidation(addProductSchema),
        addProduct
    )
    .get(
        getAllProducts
    )
    
productRouter.route("/:productId")
    .get(
        schemaValidation(productIdSchema),
        getSpecificProduct
    )
    .patch(
        checkCategoryId,
        checkSubCategory,
        checkBrandId,
        uploadFields([{name: "imgCover", maxCount: 1}, {name: "images", maxCount: 8}]),
        schemaValidation(updateProductSchema),
        updateProduct
    )
    .delete(
        schemaValidation(productIdSchema),
        deleteProduct
    )

export default productRouter;