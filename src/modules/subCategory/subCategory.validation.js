import Joi from 'joi';

const addSubCategorySchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),
    category: Joi.string().hex().length(24).required(),
})

const updateSubCategorySchema = Joi.object({
    subCategory: Joi.string().hex().length(24).required(),
    name: Joi.string()
        .min(3)
        .optional()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),
    category: Joi.string().hex().length(24).optional(),
})

const subCategoryIdSchema = Joi.object({
    subCategory: Joi.string().hex().length(24).required(),
})

export {
    addSubCategorySchema,
    updateSubCategorySchema,
    subCategoryIdSchema
}