const mongoose = require('mongoose')

const userModel = mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
          },
          lastName: {
            type: String,
            trim: true,
            required: true,
          },
          email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
          },
          password: {
            type: String,
            required: true,
          }
    },
    {
        timeStamps: true
    }
)

module.exports = mongoose.model("User", userModel)