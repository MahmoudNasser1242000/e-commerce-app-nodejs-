import couponModel from "../../../database/models/coupon.model.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import AppError from "../../../utils/errorClass.js";

const addCoupon = errorAsyncHandler(async (req, res, next) => {
    // req.body.code = Math.round(Math.random() * 9999)
    const addCoupon = new couponModel({...req.body})
    const coupon = await addCoupon.save();
    res.status(201).json({msg: "Coupon added successfully", coupon});
})

const getAllCoupons = errorAsyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(couponModel.find(), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    const coupons = await apiFeatures.mongooseQuery;
    res.status(200).json({length: coupons.length, page: apiFeatures.page, coupons});
})

const getSpecificCoupon = findById(couponModel, "couponId", "coupon")

const updateCoupon = errorAsyncHandler(async (req, res, next) => {
    const {couponId} = req.params;
    const coupon = await couponModel.findOneAndUpdate({_id: couponId}, {...req.body}, {new: true});
    if (!coupon) 
        return next(new AppError("Cant not find coupon with this id", 400))
    res.status(202).json({msg: "Coupon updated successfully", coupon});
})

const deleteCoupon = findByIdAndDelete(couponModel, "couponId", "coupon")

export {
    addCoupon,
    getAllCoupons,
    getSpecificCoupon,
    updateCoupon,
    deleteCoupon
}