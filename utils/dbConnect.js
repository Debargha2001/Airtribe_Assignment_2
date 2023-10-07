const mongoose = require('mongoose');
const config = require('../config');
mongoose.connect(config.MONGO_URL).then(response => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log(err);
})