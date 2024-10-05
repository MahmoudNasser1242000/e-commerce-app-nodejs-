import express from "express";
import AppError from "./utils/errorClass.js";
import dbconnection from "./database/dbConnection.js";
import Bootstrap from "./src/bootstrap.js";
import cors from "cors"
import errorAsyncHandler from "./services/errorAsyncHandler.js";
import Stripe from 'stripe';
import dotenv from "dotenv"
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use('/api/webhook/', express.raw({ type: 'application/json' }), errorAsyncHandler(async (req, res, next) => {
    const sig = req.headers['stripe-signature'].toString();

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
}));


app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use(cors())

Bootstrap(app)

dbconnection()

app.get("/", (req, res) =>
    res.status(200).json({ msg: "Welcome to e-commerce app!" })
);

app.use("**", (req, res, next) =>
    next(new AppError("404 page not found!", 404))
);

app.use((err, req, res, next) =>
    res
        .status(err.statusCode || 500)
        .json({ error: "Error", message: err.message, stack: err.stack })
);
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
