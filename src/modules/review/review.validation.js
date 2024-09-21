import Joi from 'joi';

const addReviewSchema = Joi.object({
    comment: Joi.string()
        .min(3)
        .messages({
            "string.min": "Comment must be at least 3 characters"
        }),

    rate: Joi.number()
        .min(0)
        .max(5)
        .required()
        .messages({
            "string.min": "Rate must be at least 0",
            "string.max": "Rate must be at most 5"
        }),
    
    product: Joi.string().hex().length(24).required(),
    user: Joi.string().hex().length(24).required(),
})

const updateReviewSchema = Joi.object({
    reviewId: Joi.string().hex().length(24).required(),
    comment: Joi.string()
        .min(3)
        .messages({
            "string.min": "Comment must be at least 3 characters"
        })
        .optional(),

    rate: Joi.number()
        .min(0)
        .max(5)
        .optional()
        .messages({
            "string.min": "Rate must be at least 0",
            "string.max": "Rate must be at most 5"
        }),
    
    product: Joi.string().hex().length(24).optional(),
    user: Joi.string().hex().length(24).optional(),
})

const reviewIdSchema = Joi.object({
    reviewId: Joi.string().hex().length(24).required(),
})

export {
    addReviewSchema,
    updateReviewSchema,
    reviewIdSchema
}