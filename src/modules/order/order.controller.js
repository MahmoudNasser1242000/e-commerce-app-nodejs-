import errorAsyncHandler from "../../../services/errorAsyncHandler.js";
import AppError from "../../../utils/errorClass.js";
import orderModel from "../../../database/models/order.model.js";
import cartModel from "../../../database/models/cart.model.js";
import productModel from "../../../database/models/product.model.js";

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

export { createOrder, getAllOrders, getAllUserOrders };
