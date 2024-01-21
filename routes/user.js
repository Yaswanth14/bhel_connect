const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user")
const { User, Product } = require("../db");

//User Routes
router.post('/signup', async (req, res) => {
    
});

router.post('/signin', (req, res) => {

});

router.get('/products', userMiddleware, (req, res) => {

});

router.post('/products/:productId', userMiddleware, (req, res) => {

})

router.get('myOrders', userMiddleware, (req, res) => {

})

module.exports = router