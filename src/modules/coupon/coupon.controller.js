import couponModel from "../../../database/models/coupon.model.js";
import { findByIdAndDelete } from "../../../services/apiHandler.js";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import AppError from "../../../utils/errorClass.js";
import QRCode from 'qrcode'

// @desc      add coupon
// @method    POST
// @route     /api/v1/coupons/
// @access    admin
const addCoupon = errorAsyncHandler(async (req, res, next) => {
    // req.body.code = Math.floor(Math.random() * 999999)
    req.body.createdBy = req.user._id;
    const addCoupon = new couponModel({...req.body})
    const coupon = await addCoupon.save();
    res.status(201).json({msg: "Coupon added successfully", coupon});
})

// @desc      get all coupons
// @method    GET
// @route     /api/v1/coupons/
// @access    public
const getAllCoupons = errorAsyncHandler(async (req, res, next) => {
    let filterObj = {};
    if (req.params.createdBy) {
        filterObj.createdBy = req.params.createdBy
    }

    const collectionLength = (await couponModel.find(filterObj)).length
    const apiFeatures = new ApiFeatures(couponModel.find(filterObj), req.query)
        .pagination(collectionLength)
        .filter()
        .sort()
        .search()
        .fields();
    const coupons = await apiFeatures.mongooseQuery;
    res.status(200).json({length: coupons.length, metadata: apiFeatures.metadata, page: apiFeatures.page, coupons});
})

// @desc      get specific coupon
// @method    GET
// @route     /api/v1/coupons/:coupon
// @access    public
const getSpecificCoupon = errorAsyncHandler(async (req, res, next) => {
    const coupon = await couponModel.findOne({_id: req.params.coupon});
    if (!coupon) 
        return next(new AppError(`Cant not find coupon with this id`, 400))

    const QR_Code = await QRCode.toDataURL(coupon.code)
    res.status(200).json({coupon, QRCode: QR_Code});
})

// @desc      update specific coupon
// @method    PATCH
// @route     /api/v1/coupons/:coupon
// @access    admin
const updateCoupon = errorAsyncHandler(async (req, res, next) => {
    const coupon = await couponModel.findOneAndUpdate({_id: req.params.coupon}, {...req.body}, {new: true});
    if (!coupon) 
        return next(new AppError("Cant not find coupon with this id", 400))
    res.status(202).json({msg: "Coupon updated successfully", coupon});
})

// @desc      delete specific coupon
// @method    DELETE
// @route     /api/v1/coupons/:coupon
// @access    admin
const deleteCoupon = findByIdAndDelete(couponModel, "coupon", "coupon")

export {
    addCoupon,
    getAllCoupons,
    getSpecificCoupon,
    updateCoupon,
    deleteCoupon
}