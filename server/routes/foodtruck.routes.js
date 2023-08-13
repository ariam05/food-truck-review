const controller = require('../controllers/foodtruck.controller');

module.exports = app => {
    // C
    app.post('/api/trucks', controller.createTruck);
    // R
    app.get('/api/trucks', controller.allTrucks);
    app.get('/api/trucks/:id', controller.oneTruck);
    // U
    app.patch('/api/trucks/:id', controller.updateTruck);
    app.patch('/api/trucks/:id/review', controller.createReview);
    // D
    app.delete('/api/trucks/:id', controller.deleteTruck);
}