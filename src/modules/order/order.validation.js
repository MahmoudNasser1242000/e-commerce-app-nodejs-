import Joi from 'joi';

const shippingAddress = {
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
}

const createOrderSchema = Joi.object(shippingAddress)

const createCheckoutSessionSchema = Joi.object(shippingAddress)

export {
    createOrderSchema,
    createCheckoutSessionSchema
}