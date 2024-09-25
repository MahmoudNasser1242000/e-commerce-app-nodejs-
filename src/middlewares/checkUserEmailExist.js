import userModel from "../../database/models/user.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkUserEmailExist = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({email: req.body.email});

    if (user) 
        return next(new AppError("Email allready exist", 400));
    next()
})

export default checkUserEmailExist