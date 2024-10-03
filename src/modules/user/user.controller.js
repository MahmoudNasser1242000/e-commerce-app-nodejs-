import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import { findById, findByIdAndDelete } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import userModel from "../../../database/models/user.model.js";

// @desc      add user
// @method     POST
// @route     /api/v1/users/
// @access    admin
const addUser = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profileImg = req.file.filename;
    const addUser = new userModel({ ...req.body });
    const user = await addUser.save();
    res.status(201).json({ msg: "User added successfully", user });
});

// @desc      get all users
// @method     GET
// @route     /api/v1/users/
// @access    admin
const getAllUsers = errorAsyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(userModel.find(), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    const users = await apiFeatures.mongooseQuery;
    res
        .status(200)
        .json({ length: users.length, page: apiFeatures.page, users });
});

// @desc      get specific user
// @method     GET
// @route     /api/v1/users/:user
// @access    admin
const getSpecificUser = findById(userModel, "user", "user");

// @desc      update specific user
// @method     PATCH
// @route     /api/v1/users/:user
// @access    admin
const updateUser = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profileImg = req.file.filename;
    const user = await userModel.findOneAndUpdate(
        { _id: req.params.user },
        { ...req.body },
        { new: true }
    );
    if (!user)
        return next(new AppError("Cant not find user with this id", 400));
    res.status(202).json({ msg: "User updated successfully", user });
});

// @desc      delete specific user
// @method     DELETE
// @route     /api/v1/users/:user
// @access    admin
const deleteUser = findByIdAndDelete(userModel, "user", "user");

export { addUser, getAllUsers, getSpecificUser, updateUser, deleteUser };
