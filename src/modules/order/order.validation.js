import Joi from 'joi';

const createOrderSchema = Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phone: Joi.string().required(),
})

export {
    createOrderSchema
}