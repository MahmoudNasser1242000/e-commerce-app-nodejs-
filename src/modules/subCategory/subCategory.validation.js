import Joi from 'joi';

const addSubCategorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),
})

const updateSubCategorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .optional()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),
})

export {
    addSubCategorySchema,
    updateSubCategorySchema
}