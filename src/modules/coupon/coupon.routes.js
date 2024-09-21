import {Router} from "express";
import { addCoupon, deleteCoupon, getAllCoupons, getSpecificCoupon, updateCoupon } from "./coupon.controller.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addCouponSchema, updateCouponSchema } from "./coupon.validation.js";

const couponRoter = Router();

couponRoter.route("/")
    .post(
        schemaValidation(addCouponSchema),
        addCoupon
    )
    .get(
        getAllCoupons
    )

couponRoter.route("/:couponId")
    .get(
        getSpecificCoupon
    )
    .patch(
        schemaValidation(updateCouponSchema),
        updateCoupon
    )
    .delete(
        deleteCoupon
    )
export default couponRoter;