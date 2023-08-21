const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./database/database")

const app = express()

// middleware
app.use(cors())
app.use(express.json()),
app.use(express.urlencoded({extended:false}))
dotenv.config()

// server
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})

connectDB()

app.get("/", (req,res)=>{
 res.send("welcome to the e-commerce backend")
})

// auth route
// app.use("/api/user", authRoute)
// products route
const productsRoute = require("./routes/productsRoute")
app.use("/api/products", productsRoute);
// category Route
const categoryRoute = require("./routes/categoryRoute")
app.use("/api/category", categoryRoute)
// cart route
// app.use("/api/cart", cartRoute)
// order route
// app.use("/api/order", orderRoute)