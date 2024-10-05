import cartModel from '../database/models/cart.model.js';
import userModel from '../database/models/user.model.js';
import errorAsyncHandler from '../services/errorAsyncHandler.js';
import UpdateProductsCount from './updateProductsCount.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleWebhook = errorAsyncHandler(async (req, res, next) => {
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

export default handleWebhook;