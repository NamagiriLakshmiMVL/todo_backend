const mongoose = require("mongoose")

const todoDeleteSchema = mongoose.Schema(
    {
        email:{type:String,required:true},
        message:{type:String,required:true}
    }
)

const todoDeleteModel = mongoose.model("tododelete",todoDeleteSchema)

module.exports = todoDeleteModel