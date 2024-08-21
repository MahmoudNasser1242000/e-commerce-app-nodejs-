import {Router} from "express";
import { addProduct } from "./product.controller.js";
import checkCategoryId from "../../middlewares/checkCategoryId.js";
import checkSubCategory from "../../middlewares/checkSubCategory.js";
import checkBrandId from "../../middlewares/checkBrandId.js";
import { getAllProducts } from "./product.controller.js";

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

export default productRouter;