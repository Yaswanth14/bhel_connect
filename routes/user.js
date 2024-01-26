const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user")
const { User, Product } = require("../db");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

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
    
    res.status(200).send({
        success: true,
        message: 'User created successfully'
    })
});

//Sign in as the registered user
router.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password
    })

    try {

        if(user){
            const token = jwt.sign({
                username: username
            }, process.env.JWT_SECRET, {
                expiresIn: "3d",
            });
    
            res.status(200).send({
                success: true,
                message: "User loged in",
                user: {
                    _id: user._id,
                    name: user.username
                },
                token: token
            });
        }
        else{
            res.send({
                success: false,
                message: "Incorrect email or password"
            });
        }
        
    } catch (error) {
        res.json({
            success: false,
            message: "User doesn't exist"
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
router.post('/buyProduct', userMiddleware, async (req, res) => {
    const productId = req.body._id;
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
        products: orders
    });
});

router.get('/user-auth', userMiddleware, (req, res) => {
    res.status(200).send({
        ok: true,
        success: true,
        message: "You are Authorized"
    })
})

module.exports = router