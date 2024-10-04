import couponModel from "../../database/models/coupon.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkCouponCode = errorAsyncHandler(async (req, res, next) => {
    const coupon = await couponModel.findOne({code: req.body.code});

    if (coupon) 
        return next(new AppError("Coupon allready exist", 400));
    
    next()
})

export default checkCouponCode