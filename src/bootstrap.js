import categoryRouter from "./modules/category/category.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/categories", categoryRouter)
}

export default Bootstrap;