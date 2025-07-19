let express = require("express")
let db = require('./db')
let app = express()
let userRouter = require('./models/user')
app.use(express.json())
app.use("/user" , userRouter)


app.listen(3000 , (req,res)=>{
    console.log("Server is now listening")
})