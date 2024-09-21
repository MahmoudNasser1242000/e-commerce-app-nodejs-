import couponModel from "../../../database/models/coupon.model.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";

const addCoupon = errorAsyncHandler(async (req, res, next) => {
    // req.body.code = Math.round(Math.random() * 9999)
    const addCoupon = new couponModel({...req.body})
    const coupon = await addCoupon.save();
    res.status(201).json({msg: "Coupon added successfully", coupon});
})

const getAllCoupons = errorAsyncHandler(async (req, res, next) => {
    const coupons = await couponModel.find({});
    res.status(200).json({coupons});
})

const getSpecificCoupon = errorAsyncHandler(async (req, res, next) => {
    const coupon = await couponModel.findById(req.params.couponId);
    if (!coupon) 
        return next(new AppError("Cant not find coupon with this id", 400))
    res.status(200).json({coupon});
})

const updateCoupon = errorAsyncHandler(async (req, res, next) => {
    const {couponId} = req.params;
    const coupon = await couponModel.findByIdAndUpdate({_id: couponId}, {...req.body}, {new: true});
    if (!coupon) 
        return next(new AppError("Cant not find coupon with this id", 400))
    res.status(202).json({msg: "Coupon updated successfully", coupon});
})

const deleteCoupon = errorAsyncHandler(async (req, res, next) => {
    const {couponId} = req.params;
    const coupon = await couponModel.findByIdAndDelete({_id: couponId});
    if (!coupon) 
        return next(new AppError("Cant not find coupon with this id", 400))
    res.status(202).json({msg: "Coupon deleted successfully", coupon});
})

export {
    addCoupon,
    getAllCoupons,
    getSpecificCoupon,
    updateCoupon,
    deleteCoupon
}