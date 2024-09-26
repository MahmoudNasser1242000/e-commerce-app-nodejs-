import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        title: {
            type: String,
            minLength: [3, "Product title must be minimum of 3 characters"],
            trim: true,
            required: true,
            unique: [true, "Product name must be unique"],
        },
        slug: {
            type: String,
            trim: true,
            lowercase: true,
            required: true,
        },
        description: {
            type: String,
            minLength: [50, "Products description must be minimum of 50 characters"],
            trim: true,
            required: true,
        },
        imgCover: String,
        images: [String],
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        priceAfterDiscount: {
            type: Number,
            min: 0,
        },
        sold: {
            type: Number,
            min: 0,
            default: 0,
        },
        stock: {
            type: Number,
            min: 0,
        },
        rateCount: Number,
        rateAvg: Number,
        rate: {
            type: Number,
            min: 0,
            max: 5,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subCategory: {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true,
        },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

productSchema.pre("save", function (next) {
    this.imgCover = "http://localhost:3000/uploads/" + this.imgCover;
    this.images = this.images?.map(
        (img) => "http://localhost:3000/uploads/" + img
    );
    next();
});

productSchema.pre("findOneAndUpdate", function (next) {
    if (this._update.imgCover) {
        this._update.imgCover =
            "http://localhost:3000/uploads/" + this._update.imgCover;
    }
    if (this._update.images) {
        this._update.images = this._update.images?.map(
            (img) => "http://localhost:3000/uploads/" + img
        );
    }
    next();
});

productSchema.pre(/^find/, function (next) {
    this.populate("productReviews", "name comment -product");
    this.populate("brand", "name")
    this.populate("category", "name")
    this.populate("subCategory", "name")
    this.populate("createdBy", "name")
    next();
});

productSchema.virtual("productReviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "product",
});

const productModel = mongoose.model("Product", productSchema);
export default productModel;
