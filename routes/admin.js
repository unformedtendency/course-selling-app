const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_admin_password } = require("../config"); 
const { adminMiddleware } = require("../middlewares/admin");


adminRouter.post("/signup", async function(req,res){
    const { email, password, firstName, lastName } = req.body;

    await adminModel.create({
        email,
        password,
        firstName,
        lastName
    })
    res.json({
        message : "sign up succeeded"
    })
})

adminRouter.post("/signin", async function(req,res){
    const { email, password } = req.body;

    const admin = await adminModel.findOne({
        email,
        password
    })

    if (admin){
        const token = jwt.sign({
            id : admin._id
        }, JWT_admin_password)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message : "incorrect credentials"
        })
    }
})

adminRouter.post("/course", adminMiddleware, async function(req,res){
    const adminId = req.adminId;

    const { title, descripton, price, imageUrl } = req.body;

    const course = await courseModel.create({
        title,
        descripton,
        price,
        imageUrl,
        creatorId : adminId
    })

    res.json({
        message : "course created endpoint",
        courseId : course._id
    })
})

adminRouter.put("/course", adminMiddleware, async function(req,res){
    const adminId = req.adminId;

    const { title, descripton, price, imageUrl, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId
    },{
        title,
        descripton,
        price,
        imageUrl
    })

    res.json({
        message : "course updated endpoint",
        courseId : course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function(req,res){
    const adminId = req.adminId;
    
    const courses = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        message : "course bulk endpoint",
        courses
    })
})

module.exports = {
    adminRouter
}