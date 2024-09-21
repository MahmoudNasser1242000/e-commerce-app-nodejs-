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
    subCategoryId: Joi.string().hex().length(24).required(),
    name: Joi.string()
        .min(3)
        .optional()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),
})

const subCategoryIdSchema = Joi.object({
    subCategoryId: Joi.string().hex().length(24).required(),
})

export {
    addSubCategorySchema,
    updateSubCategorySchema,
    subCategoryIdSchema
}