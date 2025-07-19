let express = require("express")
let userModel = require("../models/user")
let router = express.Router();
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken');

router.get("/", async (req, res) => {
    try {
        let users = await userModel.find();
        res.json(users)
    }
    catch (err) {
        res.json(err)
    }
})

router.post("/sign-in", async (req, res) => {
    try {
        let name = req.body.name
        let password = await bcrypt.hash(req.body.password, 5);
        let user = await userModel.create({ name, password })
        res.json({
            "message": "User registered successfully",
            user
        })
    }
    catch (err) {
        res.json(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        let name = req.body.name
        let password = req.body.password
        let user = await userModel.findOne({name});
        if(!user){
            res.json({
                message : "Username is incorrect"
            })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.json({
                message : "password is incorrect"
            })
        }
        let token = jwt.sign({name, userId : user._id}, process.env.JWT_TOKEN, {expiresIn : "1h"})
        res.json({
            message : "Logged in successfully",
            user,
            token
        })
    }
    catch (err) {
        res.json(err)
    }

})

async function auth(req, res,next){
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "No token provided" });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        if (decoded.id !== req.params.id) {
            return res.status(403).json({ error: "Forbidden: You can only access your own profile" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}
router.get("/get-profile/:id", auth, async (req, res) => {
    try {
        res.json({
            message: "User fetched successfully",
            user: req.user
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;