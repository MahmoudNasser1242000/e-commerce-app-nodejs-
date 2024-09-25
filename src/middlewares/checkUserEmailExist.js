import userModel from "../../database/models/user.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";

const checkUserEmailExist = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel.findOne({email: req.body.email});

    if (user) 
        return res.status(400).json({msg: "Email allready exist"});
    next()
})

export default checkUserEmailExist