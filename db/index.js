const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${conn.connection.host}`);
    } catch (error) {
        console.log('Error in mongo', error);
    }
}

connectDB();

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
