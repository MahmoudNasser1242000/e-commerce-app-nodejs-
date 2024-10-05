import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import orderModel from "../../../database/models/order.model.js";
import cartModel from "../../../database/models/cart.model.js";
import Stripe from 'stripe';
import ApiFeatures from "../../../utils/apiFeaturesClass.js";
import UpdateProductsCount from "../../../utils/updateProductsCount.js";
import dotenv from "dotenv"
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc      add order
// @method    POST
// @route     /api/v1/order/
// @access    public
const createOrder = errorAsyncHandler(async (req, res, next) => {
    let cart = await cartModel.findOne({ owner: req.user._id });
    if (!cart)
        return next(new AppError("Can not find cart for this user", 400));

    const order = new orderModel({
        owner: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body,
        totalOrderPrice: cart.totalPriceAfterDiscount || cart.totalPrice
    })
    await order.save();

    await UpdateProductsCount(cart)

    await cartModel.findOneAndDelete({ owner: req.user._id })

    res.status(201).json({ msg: "Order created successfully", order });
});

// @desc      get all orders
// @method    GET
// @route     /api/v1/order/
// @access    admin
const getAllOrders = errorAsyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(orderModel.find(), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    let orders = await apiFeatures.mongooseQuery;
    res.status(200).json({ length: orders.length, page: apiFeatures.page, orders });
});

// @desc      get my orders
// @method    GET
// @route     /api/v1/order/myOrders
// @access    public
const getAllUserOrders = errorAsyncHandler(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(orderModel.find({owner: req.user._id}), req.query)
        .pagination()
        .filter()
        .sort()
        .search()
        .fields();
    let orders = await apiFeatures.mongooseQuery;
    res.status(200).json({ length: orders.length, page: apiFeatures.page, orders });
});

// @desc      create checkout session
// @method    POST
// @route     /api/v1/order/checkout
// @access    public
const createCheckoutSession = errorAsyncHandler(async (req, res, next) => {
    let cart = await cartModel.findOne({ owner: req.user._id });
    if (!cart)
        return next(new AppError("Can not find cart for this user", 400));
    
    const totalOrderPrice = cart.totalPriceAfterDiscount || cart.totalPrice;
    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: "egp",
                unit_amount: totalOrderPrice * 100,
                product_data: {
                    name: req.user.name
                }
            },
            quantity: 1,
        }],
        mode: "payment",
        cancel_url: "https://hambozoo.netlify.app/#/cart",
        success_url: "https://hambozoo.netlify.app/#//orders",

        customer_email: req.user.email,
        client_reference_id: cart._id.toString(),
        metadata: req.body.shippingAddress
    })

    res.status(200).json({ msg: "Session created successfully", session });
})

export { createOrder, getAllOrders, getAllUserOrders, createCheckoutSession };
