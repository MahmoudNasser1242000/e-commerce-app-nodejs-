import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import productRouter from "./modules/product/product.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/categories", categoryRouter)
    app.use("/api/v1/subCategories", subCategoryRouter)
    app.use("/api/v1/brands", brandRouter)
    app.use("/api/v1/products", productRouter)
}

export default Bootstrap;