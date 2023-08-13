const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/belt_prep_trucks", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connection Established"))
    .catch(err => console.log("Something went wrong: ", err))