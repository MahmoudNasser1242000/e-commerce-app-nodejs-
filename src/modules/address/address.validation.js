import Joi from 'joi';

const addToAddressSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
})

const updateInAddressSchema = Joi.object({
    street: Joi.string().optional(),
    city: Joi.string().optional(),
    country: Joi.string().optional(),
    phone: Joi.string().optional(),
    address: Joi.string().hex().length(24).required(),
})

const addressIdSchema = Joi.object({
    address: Joi.string().hex().length(24).required(),
})

export {
    addressIdSchema,
    addToAddressSchema,
    updateInAddressSchema
}