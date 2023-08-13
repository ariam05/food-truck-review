const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/mongoose.config');
require('./routes/foodtruck.routes')(app);

app.listen(8001, () => console.log("Now listening on port 8000"));