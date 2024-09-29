import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import cartModel from "../../../database/models/cart.model.js";
import AppError from "../../../utils/errorClass.js";
import couponModel from "../../../database/models/coupon.model.js";

const calcTotalPrice = (cart) => {
    cart.totalPrice = cart.cartItems.reduce((curr, product) => {
        curr += product.price
        return curr
    }, 0)
}

const calcTotalPriceAfterDiscount = async (cart, couponCode) => {
    const coupon = await couponModel
        .findOne({ code: couponCode })

    if (!coupon || new Date() > coupon.expire || coupon.status === "inActive") {
        cart.couponCode = "";
        cart.discount = 0;
        cart.totalPriceAfterDiscount = 0;
    } else {
        cart.discount = coupon.discount;
        if (coupon.type === "percentage") {
            cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
        } else {
            cart.totalPriceAfterDiscount = cart.totalPrice - cart.discount
        }
    }
}

const addToCart = errorAsyncHandler(async (req, res, next) => {
    let cart = await cartModel.findOne({ owner: req.user._id });

    if (!cart) {
        const cart = new cartModel({
            owner: req.user._id,
            cartItems: [{ ...req.body, price: req.product.price }],
            totalPrice: req.product.price
        })
        cart = await cart.save()
    } else {
        const product = cart.cartItems.find((item) => item.product.toString() === req.product._id.toString());
        if (product) {
            product.quantity += 1;
            product.price = req.product.price * product.quantity
            calcTotalPrice(cart)
            await calcTotalPriceAfterDiscount(cart, cart.couponCode)
            await cart.save()
        } else {
            cart.cartItems.push({ ...req.body, quantity: 1, price: req.product.price });
            calcTotalPrice(cart)
            await calcTotalPriceAfterDiscount(cart, cart.couponCode)
            await cart.save()
        }
    }
    res.status(201).json({ msg: "Product added to cart successfully", cart });
});

const updateInCart = errorAsyncHandler(async (req, res, next) => {
    let cart = await cartModel.findOne({ owner: req.user._id });
    if (!cart)
        return next(new AppError("Can not find cart for this user", 400));

    const product = cart.cartItems.find((item) => item.product.toString() === req.product._id.toString());
    if (!product)
        return next(new AppError("Can not find this Product in cart", 400));

    product.quantity = req.body.quantity;
    product.price = req.product.price * product.quantity
    calcTotalPrice(cart)
    await calcTotalPriceAfterDiscount(cart, cart.couponCode)
    await cart.save()
    res.status(202).json({ msg: "Product quantity updated successfully", cart });
});

const removeFromCart = errorAsyncHandler(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate(
        { owner: req.user._id },
        {
            $pull: { cartItems: { product: req.body.product } },
        },
        { new: true }
    );

    if (!cart)
        return next(new AppError("No cart has this product", 400));

    calcTotalPrice(cart)
    await calcTotalPriceAfterDiscount(cart, cart.couponCode)
    await cart.save()
    res.status(202).json({ msg: "Product deleted from cart successfully", cart });
});

const getAllFromCart = errorAsyncHandler(async (req, res, next) => {
    let cart = await cartModel
        .findOne({ owner: req.user._id })

    if (!cart)
        return next(new AppError("Can not find cart for this user", 400));

    await calcTotalPriceAfterDiscount(cart, cart.couponCode)
    await cart.save()
    res.status(200).json({ cart });
});

const clearCart = errorAsyncHandler(async (req, res, next) => {
    const cart = await cartModel
        .findOne({ owner: req.user._id })

    if (!cart)
        return next(new AppError("Can not find cart for this user", 400));
    cart.cartItems = []
    calcTotalPrice(cart)
    cart.discount = 0
    cart.totalPriceAfterDiscount = 0
    await cart.save()
    res.status(202).json({ cart });
});

const applayCoupon = errorAsyncHandler(async (req, res, next) => {
    const coupon = await couponModel
        .findOne({ code: req.body.code })

    if (!coupon)
        return next(new AppError("Invalid coupon", 400));
    if (new Date() > coupon.expire)
        return next(new AppError("Coupon is expired", 400));
    if (coupon.status === "inActive")
        return next(new AppError("Coupon is not active now", 400));

    const cart = await cartModel
        .findOne({ owner: req.user._id })

    cart.couponCode = coupon.code;
    cart.discount = coupon.discount;
    if (coupon.type === "percentage") {
        cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * cart.discount) / 100
    } else {
        cart.totalPriceAfterDiscount = cart.totalPrice - cart.discount
    }
    await cart.save()
    res.status(201).json({ msg: "Coupon applayed to cart successfully", cart });
});

export { addToCart, removeFromCart, getAllFromCart, updateInCart, clearCart, applayCoupon };
