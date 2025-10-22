const { Router } = require("express");

const coursesRouter = Router();

coursesRouter.post("/purchases", function (req, res){
    res.json({
        message: "Sign in successfully"
    })
})

coursesRouter.get("/preview", function (req, res){
    res.json({
        message: "Sign in successfully"
    })
}) 

module.exports= coursesRouter;


