const { Truck } = require('../models/foodtruck.models');
module.exports = {
    // C
    // Create new truck
    createTruck: (req,res) => {
        Truck.exists({ name: req.body.name })
            .then(truckExists => {
                if(truckExists) {
                    return Promise.reject({errors: { name: { message: "A food truck with that name already exists."} } });
                } 
                return Truck.create(req.body)
            })
            .then(data => res.json({ message: "success", data: data }))
            .catch(err => res.json({ message: "error", data: err }));
    },
    // R
    // Get all trucks
    allTrucks: (req,res) => {
        Truck.find()
            .then(data => res.json({ message: "success", data: data }))
            .catch(err => res.json({ message: "error", data: err }));
    },
    // Get one truck
    oneTruck: (req,res) => {
        Truck.findOne({ _id: req.params.id })
            .then(data => res.json({ message: "success", data: data }))
            .catch(err => res.json({ message: "error", data: err }));
    },
    // U 
    // Edit truck
    updateTruck: (req,res) => {
        Truck.exists({ _id: { $not: { $eq: req.params.id } }, name: req.body.name })
            .then(truckExists => {
                if(truckExists){
                    return Promise.reject({errors: { name: { message: "A food truck with that name already exists."} } });
                }
                return Truck.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true })
            })
            .then(data => res.json({ message: "success", data: data }))
            .catch(err => res.json({ message: "error", data: err }));
    },
    // New review
    createReview: (req,res) => {
        Truck.exists({ _id: req.params.id, 'reviews.name': req.body.name })
            .then(reviewExists => {
                if(reviewExists){
                    return Promise.reject({ errors: { reviews: { errors: { name: { message: "You cannot leave more than 1 review on this truck." } } } } });
                }
                return Truck.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { reviews: req.body }}, { runValidators: true, new: true });
            })
            .then(data => res.json({ message: "success", data: data }))
            .catch(err => res.json({ message: "error", data: err }));
    },
    // D
    // Delete food truck
    deleteTruck: (req,res) => {
        Truck.findOneAndDelete({ _id: req.params.id })
            .then(data => res.json({ message: "success", data: data }))
            .catch(err => res.json({ message: "error", data: err }));
    }
}