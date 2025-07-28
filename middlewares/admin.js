const jwt = require("jsonwebtoken");
const { JWT_admin_password } = require("../config");

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded_info = jwt.verify(token, JWT_admin_password);

    if (decoded_info){
        req.adminId = decoded_info.id;
        next()
    } else {
        res.status(403).json({
            message : "you are not signed in"
        })
    } 
}

module.exports = {
    adminMiddleware
}