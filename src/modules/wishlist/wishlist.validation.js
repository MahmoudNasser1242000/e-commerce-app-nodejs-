import Joi from 'joi';

const productIdSchema = Joi.object({
    product: Joi.string().hex().length(24).required(),
})

export {
    productIdSchema
}