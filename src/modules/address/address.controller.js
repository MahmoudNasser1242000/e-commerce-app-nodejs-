import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import userModel from "../../../database/models/user.model.js";

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

const removeFromAddress = errorAsyncHandler(async (req, res, next) => {
    const { address } = req.params;
    const user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $pull: { address: {_id: address} },
        },
        { new: true }
    );
    res.status(201).json({ msg: "Address deleted successfully", user });
});

const getAllFromAddress = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel
        .findOne({ _id: req.user._id })
    res.status(201).json({ address: user.address });
});

const updateInAddress = errorAsyncHandler(async (req, res, next) => {
    const { address } = req.params;
    const user = await userModel.findById(req.user._id)

    const userAddress = [...user.address]
    const newAddress = userAddress.map((add) => {
        if (add._id.toString() === address.toString()) {
            add = {
                ...add,
                ...req.body
            }
            return add
        } else {
            return add
        }
    })
    
    user.address = newAddress;
    await user.save()
    res.status(201).json({ address: user.address });
});

export { addToAddress, removeFromAddress, getAllFromAddress, updateInAddress };
