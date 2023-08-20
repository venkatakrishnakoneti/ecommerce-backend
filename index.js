import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./database/database"

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
 res.json("Home route")
})

// products route
app.use("/api/products", productsRoute);
// category Route
app.use("/api/category", categoryRoute)
// cart route
// app.use("/api/cart", cartRoute)
// order route
// app.use("/api/order", orderRoute)
// auth route
app.use("/api/user", authRoute)