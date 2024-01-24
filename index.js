const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userMiddleware = require("./middleware/user")
const { User, Product } = require("./db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./config");

app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {

    const data = {
        title: "Signin Form"
    }
    res.render('signin', {data: data});
})

//Sign up as new user
app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        //Check if user exists
        await User.create({
            username: username, 
            password: password
        })

        const data = {
            message: 'User created successfully'
        }
        res.render('signin', {data: data});
    }
    catch(e){
        const data = {
            message: 'Signup unsuccessful try again'
        }
        res.render('error', {data:data});
    }
});

app.get('/signup', (req, res) => {
    const data = {
        title: "Signup form"
    }
    res.render('signup', {data: data});
})

//Sign in as the registered user
app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username,
        password
    })

    if(user){
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        // res.json({token});

        res.redirect('/products');
    }
    else{
        const data = {
            message: "Incorrect email or password"
        }

        res.status(411).render('error', {data:data});
    }
});

//Get all the available products
app.get('/products', userMiddleware, async (req, res) => {

    try{
        const products = await Product.find({ 
            isPublic: true
        })
        const data = {
            products: products
        }
        res.render('products', {data: data});

        } catch(err){
            const data = {
                message: "Invalid credentials"
            }
            res.render('error', {data: data});
        }
});

//Sell a product in the marketplace
app.post('/addProduct', userMiddleware, async (req, res) => {
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

//Purchase a product
app.post('/buyProduct/:productId', userMiddleware, async (req, res) => {
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
app.get('/myOrders', userMiddleware, async (req, res) => {
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



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
