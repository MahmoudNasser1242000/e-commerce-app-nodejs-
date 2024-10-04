import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import userModel from "../../../database/models/user.model.js";

// @desc      add to wishlist
// @method    POST
// @route     /api/v1/wishlist/:product
// @access    public
const addToWishlist = errorAsyncHandler(async (req, res, next) => {
    const { product } = req.params;
    const user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $addToSet: { wishlist: product },
        },
        { new: true }
    );
    res.status(201).json({ msg: "WishList added successfully", user });
});

// @desc      remove from wishlist
// @method    DELETE
// @route     /api/v1/wishlist/:product
// @access    public
const removeFromWishlist = errorAsyncHandler(async (req, res, next) => {
    const { product } = req.params;
    const user = await userModel.findByIdAndUpdate(
        { _id: req.user._id },
        {
            $pull: { wishlist: product },
        },
        { new: true }
    );
    res.status(201).json({ msg: "WishList deleted successfully", user });
});

// @desc      get all wishlist products
// @method    GET
// @route     /api/v1/wishlist/
// @access    public
const getAllFromWishlist = errorAsyncHandler(async (req, res, next) => {
    const user = await userModel
        .findOne({ _id: req.user._id })
        .populate({path: "wishlist", select: "-brand -category -subCategory"});
    res.status(201).json({length: user.wishlist.length, wishlist: user.wishlist });
});

export { addToWishlist, removeFromWishlist, getAllFromWishlist };
