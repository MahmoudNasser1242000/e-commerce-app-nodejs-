import Joi from 'joi';

const addBrandSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),

    files: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
})

const updateBrandSchema = Joi.object({
    brandId: Joi.string().hex().length(24).required(),
    name: Joi.string()
        .min(3)
        .optional()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),

    files: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).optional()
})

const brandIdSchema = Joi.object({
    brandId: Joi.string().hex().length(24).required(),
})

export {
    addBrandSchema,
    updateBrandSchema,
    brandIdSchema
}