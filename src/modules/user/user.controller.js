import slugify from "slugify";
import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import { findById } from "../../../services/apiHandler.js";
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import userModel from "../../../database/models/user.model.js";

const addUser = errorAsyncHandler(async (req, res, next) => {
    if (req.file) req.body.profileImg = req.file.filename;
    const addUser = new userModel({ ...req.body });
    const user = await addUser.save();
    res.status(201).json({ msg: "User added successfully", user });
});

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

const getSpecificUser = findById(userModel, "userId", "user");

const updateUser = errorAsyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    if (req.file) req.body.profileImg = req.file.filename;
    const user = await brandModel.findOneAndUpdate(
        { _id: userId },
        { ...req.body },
        { new: true }
    );
    if (!user)
        return next(new AppError("Cant not find user with this id", 400));
    res.status(202).json({ msg: "User updated successfully", user });
});

const deleteUser = findById(userModel, "userId", "user");

export { addUser, getAllUsers, getSpecificUser, updateUser, deleteUser };
