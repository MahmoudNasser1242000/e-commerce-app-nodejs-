import AppError from "../../utils/errorClass.js";

const roleAccess = (...roles) => {
    return (req, res, next) => {
        const user = req.user;    
        if (!roles.includes(user.role)) 
            return next(new AppError("User not Authorized", 401));
        next()
    }
}

export default roleAccess