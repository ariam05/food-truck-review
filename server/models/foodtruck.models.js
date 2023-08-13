const mongoose = require('mongoose');
const { ReviewSchema } = require('./review.models');

const TruckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Food truck name is required."],
        minlength: [5, "Food truck name must be at least 5 characters in length."]
    },
    style: {
        type: String,
        required: [true, "We need to know what kind of food this truck serves."],
        minlength: [3, "Cuisine style must be a minimum 3 characters in length"]
    },
    description: {
        type: String,
        required: [true, "You must give a description."],
        minlength: [10, "Food truck description must be at least 10 characters in length."]
    }, 
    reviews: [ReviewSchema]
}, { timestamps: true });

module.exports.Truck = mongoose.model("Truck", TruckSchema);