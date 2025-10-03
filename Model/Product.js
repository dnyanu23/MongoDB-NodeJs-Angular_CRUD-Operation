const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    cost: Number,
    color: String,
    company: String
});

module.exports = mongoose.model("Product", productSchema);