import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import userModel from "../../../database/models/user.model.js";

const addToWishlist = errorAsyncHandler(async (req, res, next) => {
    const { product } = req.params;
    const user = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
            $addToSet: { wishlist: product },
        },
        { new: true }
    );
    res.status(201).json({ msg: "WishList added successfully", user });
});

const removeFromWishlist = errorAsyncHandler(async (req, res, next) => {
    const { product } = req.params;
    const user = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
            $pull: { wishlist: product },
        },
        { new: true }
    );
    res.status(201).json({ msg: "WishList deleted successfully", user });
});

const getAllFromWishlist = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel
        .findOne({ _id: req.user._id })
        .populate({path: "wishlist", select: "-brand -category -subCategory"});
    res.status(201).json({ wishlist: user.wishlist });
});

export { addToWishlist, removeFromWishlist, getAllFromWishlist };
