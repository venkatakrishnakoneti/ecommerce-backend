const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
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
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
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

module.exports = mongoose.model("Product", productSchema)