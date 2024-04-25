const mongoose = require("mongoose")

const todoSchema = mongoose.Schema(
    {
        email:{type:String,required:true},
        message:{type:String,required:true}

    }
)

const todoModel = mongoose.model("todo_message",todoSchema)

module.exports = todoModel