import {Router} from "express";
import { addProduct, getSpecificProduct, getAllProducts, updateProduct, deleteProduct } from "./product.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import checkSubCategory from "../../middlewares/checkSubCategory.js";
import checkBrandId from "../../middlewares/checkBrandId.js";

const productRouter = Router();

productRouter.route("/")
    .post(
        checkCategoryId,
        checkSubCategory,
        checkBrandId,
        addProduct
    )
    .get(
        getAllProducts
    )
    
productRouter.route("/:productId")
    .get(
        getSpecificProduct
    )
    .patch(
        checkCategoryId,
        checkSubCategory,
        checkBrandId,
        updateProduct
    )
    .delete(
        deleteProduct
    )

export default productRouter;