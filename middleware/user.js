const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

function userMiddleware(req, res, next) {
    const jwtToken = req.headers.authorization;
    const decodedValue = jwt.verify(jwtToken, process.env.JWT_SECRET);

    if (decodedValue.username) {    
        req.username = decodedValue.username;
        next();
    } else {
        res.json({
            success: false,
            message: "You are not authenticated"
        })
    }
}

module.exports = userMiddleware;