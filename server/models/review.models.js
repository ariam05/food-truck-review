const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You must enter a name."],
        minlength: [2, "Name must be at least 2 characters in length."]
    },
    review: {
        type: String,
        required: [true, "What's the point of leaving a review if you don't leave a review?"],
        minlength: [10, "Your review must be at least 10 characters in length."]
    },
    rating: {
        type: Number,
        required: [true, "Stop messing with the inspect tool you noob"],
        min: [1, "You cannot leave fewer than 1 star"],
        max: [5, "You cannot leave more than 5 stars"]
    }
})

module.exports = {
    ReviewSchema
}