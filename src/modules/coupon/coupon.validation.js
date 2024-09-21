import Joi from 'joi';

const addCouponSchema = Joi.object({
    code: Joi.string()
        .min(5)
        .required()
        .messages({
            "string.min": "Coupon code must be at least 5 characters"
        }),

    expire: Joi.date().required(),

    discount: Joi.number()
        .min(1)
        .required()
        .messages({
            "string.min": "Discount name must be at least 1"
        }),

    type: Joi.string()
        .valid("percentage", "fixed")
        .messages({
            "string.valid": "Type must be one of percentage or fixed",
        }),

    status: Joi.string()
        .valid("active", "inActive"),
    
    product: Joi.string().hex().length(24).required(),
    admin: Joi.string().hex().length(24).required(),
})

const updateCouponSchema = Joi.object({
    couponId: Joi.string().hex().length(24).required(),
    code: Joi.string()
        .min(5)
        .optional()
        .messages({
            "string.min": "Coupon code must be at least 5 characters"
        }),

    expire: Joi.date().optional(),

    discount: Joi.number()
        .min(1)
        .optional()
        .messages({
            "string.min": "Discount name must be at least 1"
        }),

    type: Joi.string()
        .valid("percentage", "fixed")
        .optional()
        .messages({
            "string.valid": "Type must be one of percentage or fixed",
        }),

    status: Joi.string()
        .valid("active", "inActive")
        .optional()
        .messages({
            "string.valid": "Status must be one of active or inactive",
        }),
    
    product: Joi.string().hex().length(24).optional(),
    admin: Joi.string().hex().length(24).optional(),
})

const couponIdSchema = Joi.object({
    couponId: Joi.string().hex().length(24).required(),
})

export {
    addCouponSchema,
    updateCouponSchema,
    couponIdSchema
}