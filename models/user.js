let mongoose = require("mongoose")
let Schema = mongoose.Schema;
let ObjectId = mongoose.ObjectId;

let user = new Schema({
    name : {type: String, unique : true},
    password : {type: String}
})


let userModel = mongoose.model('users' , user)

module.exports = userModel