import {Router} from "express";
import { addCoupon, deleteCoupon, getAllCoupons, getSpecificCoupon, updateCoupon } from "./coupon.controller.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addCouponSchema, couponIdSchema, updateCouponSchema } from "./coupon.validation.js";

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
        schemaValidation(couponIdSchema),
        getSpecificCoupon
    )
    .patch(
        schemaValidation(updateCouponSchema),
        updateCoupon
    )
    .delete(
        schemaValidation(couponIdSchema),
        deleteCoupon
    )
export default couponRoter;