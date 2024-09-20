import { mongoose } from "mongoose"
import multer from "multer"
import AppError from "./errorClass.js"

const filesUpload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = new mongoose.Types.ObjectId + '_' + file.originalname
            cb(null, uniqueSuffix)
        }
    })

    function fileFilter(req, file, cb) {
        if (file.mimetype.startsWith("image")) {
            cb(null, true)
        } else {
            cb(new AppError("Inavlid image type", 401), false)
        }
    }

    const upload = multer({ storage, fileFilter })
    return upload
}

export const uploadSingle = (fieldName) => filesUpload().single(fieldName);
export const uploadArray = (fieldName, maxLength) => filesUpload().array(fieldName, maxLength);
export const uploadFields = (arrOfFields) => filesUpload().fields(arrOfFields);