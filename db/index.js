const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect('mongodb+srv://yaswanth14333:JGiLaIwoVrSqCFi9@100xdevs.eifljem.mongodb.net/test_connect');

// Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const ProductSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageLink: String,
    price: Number,
    isPublic: {type: Boolean, default: true},
    date: {type: Date, default: Date.now}
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);

module.exports = {
    User,
    Product
}
