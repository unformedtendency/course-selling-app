const { Router } = require("express");
const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async function(req,res){
    const userId = req.userId;
    const courseId = req.body.courseId;

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message : "purchased a course endpoint"
    })
})

courseRouter.get("/preview", function(req,res){
    const courses = courseModel.find({});
    res.json({
        courses
    })
})

module.exports = {
    courseRouter
}