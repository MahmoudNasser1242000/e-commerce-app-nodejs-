import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import userModel from "../../../database/models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config()

// @desc      signup user
// @method     POST
// @route     /api/v1/auth/signUp
// @access    public
const signUp = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profileImg = req.file.filename;
    const addUser = new userModel({ ...req.body });
    const user = await addUser.save();
    res.status(201).json({ msg: "User added successfully", user });
});

// @desc      signin user
// @method     POST
// @route     /api/v1/auth/signIn
// @access    public
const signIn = errorAsyncHandler(async (req, res, next) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email});
    if (!user)
        return next(new AppError("Worng email or password", 400));

    const passMatched = bcrypt.compareSync(password, user.password);
    if (!passMatched)
        return next(new AppError("Worng email or password", 400));

    var token = jwt.sign({ name: user.name, userId: user._id, role: user.role }, process.env.TOKEN_SECRET_KEY);
    res.status(201).json({ user, token });
});

// @desc      change user password
// @method     PATCH
// @route     /api/v1/auth/changePassword
// @access    public
const changePassword = errorAsyncHandler(async (req, res, next) => {
    const { password, newPassword } = req.body;
    const loggedUser = req.user;

    const passMatched = bcrypt.compareSync(password, loggedUser.password);
    if (!passMatched)
        return next(new AppError("Worng password", 400));

    const user = await userModel.findOneAndUpdate(
        { _id: loggedUser._id },
        { password: newPassword, changePasswordAt: new Date() },
        { new: true }
    );
    if (!user)
        return next(new AppError("Cant not find user with this id", 400));
    res.status(202).json({ msg: "Password updated successfully", user });
});

export { signUp, signIn, changePassword };
