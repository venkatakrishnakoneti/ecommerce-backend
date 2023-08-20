import mongoose from "mongoose"

const productModel = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
    },
    price: {
        type: Number || Float32Array,
        required: true,
        default: 1
    },
    availability: {
        type: Boolean,
        required: true
    }
},
    {
        timeStamps: true,
    }
)

module.exports = mongoose.model("Product", productModel)