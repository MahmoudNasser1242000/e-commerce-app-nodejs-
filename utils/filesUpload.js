import { mongoose } from "mongoose"
import multer from "multer"
import AppError from "./errorClass.js"

const filesUpload = (folderName) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `uploads/${folderName}`)
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

export const uploadSingle = (folderName, fieldName) => filesUpload(folderName).single(fieldName);
export const uploadArray = (folderName, fieldName, maxLength) => filesUpload(folderName).array(fieldName, maxLength);
export const uploadFields = (folderName, arrOfFields) => filesUpload(folderName).fields(arrOfFields);