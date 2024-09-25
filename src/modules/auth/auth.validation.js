import Joi from 'joi';

const signUpSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .required()
        .messages({
            "string.min": "User name must be at least 3 characters"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    password: Joi.string()
        .required()
        .min(6)
        .pattern(new RegExp('^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$'))
        .messages({
            "string.pattern": `Password must contains at least 3 numbers,
            2 characters one of them must be uppercase 
            and one special character`,
            "string.min": "Password name must be 6 to 20 characters"
        }),

    password: Joi.string()
        .required()
        .min(6)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers, 2 characters one of them must be uppercase and one special character`,
            "string.min": "Password name must be 6 to 20 characters"
        }),

    repassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
        "any.valid": "Password and repassword must be matched",
    }),

    role: Joi.string()
        .valid("admin", "user")
        .messages({
            "any.valid": "Status must be one of user or admin",
        }),

    isBlocked: Joi.boolean()
        .valid("admin", "user")
        .messages({
            "string.base": "Field type must be boolean ",
        }),

    confirmEmail: Joi.boolean()
        .valid("admin", "user")
        .messages({
            "string.base": "Field type must be boolean ",
        }),

    file: Joi.object({
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

const signInSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Email must be valid"
        }),

    password: Joi.string()
        .required()
})

const changePasswordSchema = Joi.object({
    password: Joi.string()
        .required()
        .min(6)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers, 2 characters one of them must be uppercase and one special character`,
            "string.min": "Password name must be 6 to 20 characters"
        }),

    repassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
        "any.valid": "Password and repassword must be matched",
    }),

    newPassword: Joi.string()
        .required()
        .min(6)
        .pattern(/^(?=.*\d{3,})(?=(.*[\W_])+)(?=.*[a-zA-Z]{2,})(?=.*[A-Z]+).{6,20}$/)
        .messages({
            "string.pattern.base": `Password must contains at least 3 numbers, 2 characters one of them must be uppercase and one special character`,
            "string.min": "Password name must be 6 to 20 characters"
        }),
})

export {
    signUpSchema,
    signInSchema,
    changePasswordSchema
}