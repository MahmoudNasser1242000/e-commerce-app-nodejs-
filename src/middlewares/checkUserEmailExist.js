import userModel from "../../database/models/user.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import AppError from "../../utils/errorClass.js";

const checkUserEmailExist = errorAsyncHandler(async (req, res, next) => {
    if (req.body.email) {
        const user = await userModel.findOne({ email: req.body.email });

        if (user)
            return next(new AppError("Email allready exist", 400));
        next()
    } else {
        next()
    }
})

export default checkUserEmailExist