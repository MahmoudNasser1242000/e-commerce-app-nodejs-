import Joi from 'joi';

const addProductSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),

    description: Joi.string()
        .min(50)
        .required()
        .messages({
            "string.min": "Product description must be at least 50 characters"
        }),

    price: Joi.number()
        .min(0)
        .required()
        .messages({
            "string.min": "Price must be atleast 0"
        }),

    priceAfterDiscount: Joi.number()
        .min(0)
        .messages({
            "string.min": "Price after discount must be at least 0"
        }),

    sold: Joi.number()
        .min(0)
        .messages({
            "string.min": "Sold products must be at least 0 product"
        }),

    stock: Joi.number()
        .min(0)
        .required()
        .messages({
            "string.min": "stocked products must be at least 0 product"
        }),

    category: Joi.string().hex().length(24).required(),
    subCategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),

    imgCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    })).required(),

    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    })).optional()
})

const updateProductSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
    title: Joi.string()
        .min(3)
        .optional()
        .messages({
            "string.min": "Brand name must be at least 3 characters"
        }),

    description: Joi.string()
        .min(50)
        .optional()
        .messages({
            "string.min": "Product description must be at least 50 characters"
        }),

    price: Joi.number()
        .min(0)
        .optional()
        .messages({
            "string.min": "Price must be atleast 0"
        }),

    priceAfterDiscount: Joi.number()
        .min(0)
        .optional()
        .messages({
            "string.min": "Price after discount must be at least 0"
        }),

    sold: Joi.number()
        .min(0)
        .optional()
        .messages({
            "string.min": "Sold products must be at least 0 product"
        }),

    stock: Joi.number()
        .min(0)
        .optional()
        .messages({
            "string.min": "stocked products must be at least 0 product"
        }),

    category: Joi.string().hex().length(24).optional(),
    subCategory: Joi.string().hex().length(24).optional(),
    brand: Joi.string().hex().length(24).optional(),

    imgCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    })).optional(),

    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid("image/png", "image/jpeg", "image/jpg").required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    })).optional()
})

const productIdSchema = Joi.object({
    productId: Joi.string().hex().length(24).required(),
})

export {
    addProductSchema,
    updateProductSchema,
    productIdSchema
}