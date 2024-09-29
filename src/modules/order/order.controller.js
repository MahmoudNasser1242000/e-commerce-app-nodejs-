import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import orderModel from "../../../database/models/order.model.js";
import cartModel from "../../../database/models/cart.model.js";
import productModel from "../../../database/models/product.model.js";
import Stripe from 'stripe';
const stripe = new Stripe('sk_test_51MEl47Ismuy6V5j4HrttIl1Svql7ULogUr0OG3GBeYzd69V0f2RL5SNAXDI4DFLlCM9W13UlZukSUbtjQBordSDH00N5Wpz5Fi');

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

export { createOrder, getAllOrders, getAllUserOrders, createCheckoutSession };
