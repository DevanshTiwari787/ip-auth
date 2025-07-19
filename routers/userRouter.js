let express = require("express")
let userModel = require("../models/user")
let router = express.Router();

router.get("/" , async (req,res)=>{
    try{
        let users = await userModel.find()
        res.json(users)
    }   
    catch(err){
        res.json(err)
    }
})