import productModel from "../database/models/product.model.js"

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

export default UpdateProductsCount