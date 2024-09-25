import userModel from "../../database/models/user.model.js";
import errorAsyncHandler from "../../services/errorAsyncHandler.js";
import jwt from "jsonwebtoken"
import AppError from "../../utils/errorClass.js";

const protectAuth = errorAsyncHandler(async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization || !authorization.startsWith("Bearer"))
        return next(new AppError("Must provide valid token", 400));

    const token = authorization.split(" ")[1];
    const decode = jwt.verify(token, 'Login_Auth');
    if (!decode)
        return next(new AppError("Invalid token", 400));
    
    const user = await userModel.findById(decode.userId);
    if (!user) 
        return next(new AppError("Invalid user token", 400));

    if (user.changePasswordAt && decode.iat < Math.round(user.changePasswordAt.getTime())) 
        return next(new AppError("Invalid user token", 400));
    req.user = user
    next()
})

export default protectAuth