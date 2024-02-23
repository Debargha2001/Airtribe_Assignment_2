const express = require('express');
const config = require('./config');
require('./utils/dbConnect');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', require('./routes/router'));

app.listen(config.PORT, err => {
    if(err){
        console.log(err);
    }
    console.log(`Server is running on port ${config.PORT}`);
})