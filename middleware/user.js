const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
    // const token = req.headers.authorization;
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inlhc3dhbnRoQGdtYWlsLmNvbSIsImlhdCI6MTcwNjA3ODgzM30.c8MQK_6FmWETSltOGSqDO2rdSfYC3TFDkJJG6iNmJLI";

    if(typeof token!= "undefined"){
        const words = token.split(" ");
        const jwtToken = words[1];
        const decodedValue = jwt.verify(jwtToken, JWT_SECRET);

        if (decodedValue.username) {    
            req.username = decodedValue.username;
            next();
        } else {
            res.status(403).json({
                msg: "You are not authenticated"
            })
        }
    }
    else{
        res.status(401).json({msg:"No token provided"})
    }
}

module.exports = userMiddleware;