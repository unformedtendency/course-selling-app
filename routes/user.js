const { Router } = require("express");
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_user_password } = require("../config");

const userRouter = Router();

userRouter.post("/signup", async function(req,res){
    const { email, password, firstName, lastName } = req.body;

    await userModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message : "sign up succeeded"
    })
})

userRouter.post("/signin", async function(req,res){
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email,
        password
    })

    if (user){
        const token = jwt.sign({
            id : user._id
        }, JWT_user_password)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message : "incorrect credentials"
        })
    }
})

userRouter.get("/purchases", async function(req,res){
    const userId = req.userId;

    const purchased_courses = await purchaseModel.find({
        userId
    })

    res.json({
        purchased_courses
    })
})

module.exports = {
    userRouter
}