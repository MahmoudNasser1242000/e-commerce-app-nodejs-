import AppError from "./errorClass.js"

const schemaValidation = (schema) => {
    return (req, res, next) => {
        let inputData;
        if (req.file || req.files) {
            inputData = {files: req.files? req.files : req.file, ...req.body, ...req.param, ...req.query}
        } else {
            inputData = {...req.body, ...req.param, ...req.query}
        }
        const {error} = schema.validate(inputData, {abortEarly: false})
        if (error) {
            const errValidation = error.details.map((err) => err.message)
            next(new AppError(errValidation, 401))
        }
        next()
    }
}

export default schemaValidation