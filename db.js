let mongoose = require("mongoose")
require("dotenv").config(); 
mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection;
db.on('connected' , ()=>{
    console.log("DB connected!")
})
db.on('disconnected' , ()=>{
    console.log("DB disconnected")
})
db.on('error' , ()=>{
    console.log("Something went wrong while connecting to MongoDB...")
})

module.exports = db