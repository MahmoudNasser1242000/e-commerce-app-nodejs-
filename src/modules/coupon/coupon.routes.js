import {Router} from "express";
import { addCoupon, deleteCoupon, getAllCoupons, getSpecificCoupon, updateCoupon } from "./coupon.controller.js";
import schemaValidation from "../../../utils/schemaValidation.js";
import { addCouponSchema, couponIdSchema, updateCouponSchema } from "./coupon.validation.js";
import protectAuth from "../../middlewares/protectAuth.js";
import roleAccess from "../../middlewares/RoleAccess.js";

const couponRoter = Router({mergeParams: true});

couponRoter.route("/")
    .post(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(addCouponSchema),
        addCoupon
    )
    .get(
        protectAuth,
        roleAccess("admin"),
        getAllCoupons
    )

couponRoter.route("/:couponId")
    .get(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(couponIdSchema),
        getSpecificCoupon
    )
    .patch(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(updateCouponSchema),
        updateCoupon
    )
    .delete(
        protectAuth,
        roleAccess("admin"),
        schemaValidation(couponIdSchema),
        deleteCoupon
    )
export default couponRoter;