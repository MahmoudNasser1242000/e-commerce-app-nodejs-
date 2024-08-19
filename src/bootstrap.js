import categoryRouter from "./modules/category/category.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/categories", categoryRouter)
    app.use("/api/v1/subCategories", subCategoryRouter)
}

export default Bootstrap;