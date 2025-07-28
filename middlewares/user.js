const jwt = require("jsonwebtoken");
const { JWT_user_password } = require("../config");

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decoded_info = jwt.verify(token, JWT_user_password);

    if (decoded_info){
        req.userId = decoded_info.id;
        next()
    } else {
        res.status(403).json({
            message : "you are not signed in"
        })
    } 
}

module.exports = {
    userMiddleware
}