const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORDJWT_ADMIN_PASSWORD, JWT_ADMIN_PASSWORD} = require("../config");

function adminMiddleware(req, res, next){
    const token = req.header.token;
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    if (decoded){
        res.admin.Id = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "Access denied. No token provided."
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}