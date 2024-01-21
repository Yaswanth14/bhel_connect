const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user")
const { User, Product } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

//User Routes

//Sign up as new user
router.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //Check if user exists
    await User.create({
        username: username, 
        password: password
    })
    
    res.json({
        message: 'User created successfully'
    })
});

//Sign in as the registered user
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }
    else{
        res.status(411).json({
            message: "Incorrect email or password"
        });
    }
});

//Sell a product in the marketplace
router.post('/addProduct', userMiddleware, async (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;

    const newProduct = await Product.create({
        name,
        description,
        imageLink,
        price
    });

    res.json({
        message: "Product created successfully", productId: newProduct._id 
    });
});  

//Get all the available products
router.get('/products', userMiddleware, async (req, res) => {
    const products = await Product.find({ 
        isPublic: true
     })

     res.json({
        products: products
     })
});

//Purchase a product
router.post('/buyProduct/:productId', userMiddleware, async (req, res) => {
    const productId = req.params.productId;
    const username = req.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            purchasedProducts: productId
        }
    });

    await Product.updateOne({
        _id: productId
    }, {
        "$set": {
            isPublic: false
        }
    });

    res.json({
        message: "Purchase complete"
    });
});

//View previous purchases
router.get('/myOrders', userMiddleware, async (req, res) => {
    const username = req.username;
    const user = await User.findOne({
        username:username
    })
    const orders = await Product.find({
        _id: {
            "$in": user.purchasedProducts
        }
    });

    res.json({
        orders: orders
    });
});

module.exports = router