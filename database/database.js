import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to mongoDB")
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

module.exports = connectDB