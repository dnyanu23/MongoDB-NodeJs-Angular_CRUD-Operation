const mongoose = require('mongoose');

const dbConnect = () => {
    mongoose.connect("mongodb://127.0.0.1/shopperstopDB")
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(e => {
            console.log(e);
        });
};
module.exports = dbConnect;

