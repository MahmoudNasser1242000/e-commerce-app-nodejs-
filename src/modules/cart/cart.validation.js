import Joi from 'joi';

const addToCartSchema = Joi.object({
    product: Joi.string().hex().length(24).required(),
})

const removeFromCartSchema = Joi.object({
    product: Joi.string().hex().length(24).required(),
})

const updateInCartSchema = Joi.object({
    quantity: Joi.number().required(),
    product: Joi.string().hex().length(24).required(),
})

const applayCouponSchema = Joi.object({
    code: Joi.string().required(),
})

export {
    addToCartSchema,
    removeFromCartSchema,
    updateInCartSchema,
    applayCouponSchema
}