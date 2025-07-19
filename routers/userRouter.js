let express = require("express")
let userModel = require("../models/user")
let router = express.Router();
let bcrypt = require('bcrypt')
router.get("/" , async (req,res)=>{
    try{
        let users = await userModel.find();
        res.json(users)
    }   
    catch(err){
        res.json(err)
    }
})

router.post("/sign-in" , async(req,res)=>{
    try{
        let name = req.body.name
        let password = await bcrypt.hash(req.body.password, 5);
        let user = await userModel.create({name,password})
        res.json({
            "message" : "User registered successfully",
            user
        })
    }
    catch(err){
        res.json(err)
    }
})
module.exports = router;