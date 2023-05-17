const express = require("express")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cors = require('cors')
require("dotenv").config()

const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'https://capstone-project-3-tan.vercel.app/', 
    credentials: true 
}));


const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("mongoDB is connected")
    }catch(err){
        console.log(err)
    }
}
dbConnection()

app.use("/users", userRoutes)
app.use("/products", productRoutes)
app.use("/orders",orderRoutes)

app.listen(4000, () => {
    console.log("back end app listening at port 4000")
})