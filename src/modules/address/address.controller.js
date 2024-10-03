import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import userModel from "../../../database/models/user.model.js";
import AppError from "../../../utils/errorClass.js";

// @desc      add user address
// @method     POST
// @route     /api/v1/address/
// @access    public
const addToAddress = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $addToSet: { address: req.body },
        },
        { new: true }
    );
    res.status(201).json({ msg: "Address added successfully", user });
});

// @desc      remove user addresses
// @method     DElETE
// @route     /api/v1/address/:address
// @access    public
const removeFromAddress = errorAsyncHandler(async (req, res, next) => {
    const { address } = req.params;

    let userAddress = req.user.address.find((add) => add._id.toString() === address.toString())
    if (!userAddress)
        return next(new AppError("Can not find this address", 400))

    const user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $pull: { address: {_id: address} },
        },
        { new: true }
    );
    res.status(201).json({ msg: "Address deleted successfully", user });
});

// @desc      get all user addresses
// @method     GET
// @route     /api/v1/address/
// @access    public
const getAllFromAddress = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel
        .findOne({ _id: req.user._id })
    res.status(201).json({ length: user.address.length, address: user.address });
});

// @desc      update user addresses
// @method     PATCH
// @route     /api/v1/address/:address
// @access    public
const updateInAddress = errorAsyncHandler(async (req, res, next) => {
    const { address } = req.params;
    const user = await userModel.findById(req.user._id)

    //another solution
    // const userAddress = [...user.address]
    // const newAddress = userAddress.map((add) => {
    //     if (add._id.toString() === address.toString()) {
    //         add = {
    //             ...add,
    //             ...req.body
    //         }
    //         return add
    //     } else {
    //         return add
    //     }
    // })
    
    let userAddress = user.address.findIndex((add) => add._id.toString() === address.toString())
    if (userAddress === -1)
        return next(new AppError("Can not find this address", 400))

    user.address[userAddress] = {...userAddress, ...req.body};
    await user.save()
    res.status(201).json({ msg: "Address updated successfully", address: user.address });
});

export { addToAddress, removeFromAddress, getAllFromAddress, updateInAddress };
