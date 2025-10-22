const jwt = require('jsonwebtoken');
const {JWT_USER_PASSWORD} = require("../config");

function userMiddleware(req, res, next){
    const token = req.header.token;
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    if (decoded){
        res.user.Id = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "Access denied. No token provided."
        })
    }
}

module.exports = {
    userMiddleware: userMiddleware
}