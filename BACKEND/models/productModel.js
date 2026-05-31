import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Please enter a title for the product"]
    },

    price: {
        type: Number,
        required: [true, "Please enter a price for the product"]
    },

    image: {
        type: String,
        required: [true, "Please enter an image for the product"]
    },

    mediaType: {
        type: String,
        default: "image"
    },

    category: {
        type: String,
        required: [true, "Please enter a category"]
    },

    description: {
        type: String,
        required: [true, "Please enter a description for the product"]
    }

});
const product = mongoose.model("Product", productSchema);
export default product;