import userModel from "../../database/models/user.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkUserId = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel.findById(req.params.user);

    if (!user) 
        return res.status(400).json({msg: "Can not find user with this id"});
    next()
})

export default checkUserId