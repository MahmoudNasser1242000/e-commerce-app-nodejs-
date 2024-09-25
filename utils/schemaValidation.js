import AppError from "./errorClass.js"

const schemaValidation = (schema) => {
    return (req, res, next) => {
        let inputData;
        if (req.file) {
            inputData = {file: req.file, ...req.body, ...req.params, ...req.query}
        } else if (req.files) {
            inputData = {...req.files, ...req.body, ...req.params, ...req.query}
        } else {
            inputData = {...req.body, ...req.params, ...req.query}
        }
        
        const {error} = schema.validate(inputData, {abortEarly: false})
        if (error) {
            const errValidation = error.details.map((err) => err.message)
            return res.status(401).json({error: "Error", message: errValidation})
        }
        next()
    }
}

export default schemaValidation