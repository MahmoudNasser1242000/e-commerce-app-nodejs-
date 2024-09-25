import userModel from "../../database/models/user.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkUserId = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.params.user);

    if (!user) 
        return next(new AppError("Can not find user with this id", 400));
    next()
})

export default checkUserId