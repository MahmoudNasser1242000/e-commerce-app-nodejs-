import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import orderModel from "../../../database/models/order.model.js";
import cartModel from "../../../database/models/cart.model.js";
import productModel from "../../../database/models/product.model.js";
import Stripe from 'stripe';
import dotenv from "dotenv"
import userModel from "../../../database/models/user.model.js";
dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const UpdateProductsCount = async (cart) => {
    const options = cart.cartItems.map((item) => {
        return ({
            updateOne: {
                "filter": {_id: item.product},
                "update": {$inc: {sold: item.quantity, stock: -item.quantity}}
            }
        })
    })
    await productModel.bulkWrite(options)
}

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

const getAllOrders = errorAsyncHandler(async (req, res, next) => {
    let orders = await orderModel.findOne({})
    res.status(200).json({ length: orders.length, orders });
});

const getAllUserOrders = errorAsyncHandler(async (req, res, next) => {
    let orders = await orderModel.findOne({owner: req.user._id})
    res.status(200).json({ length: orders.length, orders });
});

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

const createOnlineOrder = errorAsyncHandler(async (req, res, next) => {
    const sig = req.headers['stripe-signature'];

    let event = stripe.webhooks.constructEvent(req.body, sig, "whsec_hQed6a2FZivxiyEj0HzjvLO4wA02DYKf");

    if (event.type === "checkout.session.completed") {
        const checkout = event.data.object;

        let cart = await cartModel.findOne({ _id: checkout.client_reference_id });
        let user = await userModel.findOne({ email: checkout.customer_email });

        const order = new orderModel({
            owner: user._id,
            orderItems: cart.cartItems,
            shippingAddress: checkout.metadata,
            totalOrderPrice: checkout.amount_total / 100,
            paymentType:"card",
            ispaid: true,
            paidAt: new Date()
        })
        await order.save();

        await UpdateProductsCount(cart)

        await cartModel.findOneAndDelete({ _id: checkout.client_reference_id })

        res.status(201).json({ msg: "Order created successfully", checkout });
    }
})

export { createOrder, getAllOrders, getAllUserOrders, createCheckoutSession, createOnlineOrder };
