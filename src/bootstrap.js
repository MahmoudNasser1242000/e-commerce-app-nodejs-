import authRouter from "./modules/auth/auth.routes.js";
import brandRouter from "./modules/brand/brand.routes.js";
import categoryRouter from "./modules/category/category.routes.js";
import couponRoter from "./modules/coupon/coupon.routes.js";
import productRouter from "./modules/product/product.routes.js";
import reviewRoter from "./modules/review/review.routes.js";
import subCategoryRouter from "./modules/subCategory/subCategory.routes.js";
import userRouter from "./modules/user/user.routes.js";
import wishlistRouter from "./modules/wishlist/wishlist.routes.js";

const Bootstrap = (app) => {
    app.use("/api/v1/categories", categoryRouter)
    app.use("/api/v1/subCategories", subCategoryRouter)
    app.use("/api/v1/brands", brandRouter)
    app.use("/api/v1/products", productRouter)
    app.use("/api/v1/coupons", couponRoter)
    app.use("/api/v1/reviews", reviewRoter)
    app.use("/api/v1/users", userRouter)
    app.use("/api/v1/auth", authRouter)
    app.use("/api/v1/wishlist", wishlistRouter)
}

export default Bootstrap;