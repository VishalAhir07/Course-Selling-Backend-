const { Router } = require('express');
const  adminRouter = Router();
const {adminMiddleware} = require('../middlewares/admin');
const { adminModel, courseModel } = require('../db');
const jwt = require('jsonwebtoken');
const {JWT_ADMIN_PASSWORD} = require("../config");


adminRouter.post("/signup",  async function (req, res){

    const { email , password , firstName , lastName } = req.body;

   await adminModel.create({
     email: email,
     password: password,
     firstName: firstName,
     lastName: lastName
  })
  
    res.json({
        message: "Signup up successfully"
    })
})

adminRouter.post("/signin",  async function (req , res){

    const { email , password } = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    });

    if (admin) {
    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD);
    res.json({ token: token });
} else {
    res.status(403).json({ message: "Invalid email or password" });
}

})

adminRouter.post("/course", async function (req, res){


    const  {title , description , price , imageUrl} = req.body;
       
    const course =  await courseModel.create({
        title:title ,
        description:description ,
        price:price ,
        imageUrl:imageUrl ,
        creatorId: req.adminId
     })

    res.json({
        message: "Ban Gaya",
        course : course
    })
})

adminRouter.put("/course_update", adminMiddleware, async function (req, res){

    req.adminId = req.adminId;

    const  {title , description , price , imageUrl , courseId} = req.body;
    
    const course =  await courseModel.updateOne({
        _id: courseId ,
        creatorId: req.adminId},
        {
        title:title ,
        description:description ,
        price:price ,
        imageUrl:imageUrl
        })
    res.json({
        message: "Ban gaya vapas",
        course : course
    })
})

adminRouter.get("/course/bulk", adminMiddleware, async function (req, res){
   const adminId = req.adminId;

   const courses =  await courseModel.find({creatorId: adminId})

    res.json({
        message: "mil gae sab",
        courses: courses
    })
})

module.exports = adminRouter;
