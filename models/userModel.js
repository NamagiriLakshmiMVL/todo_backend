const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
{
    name:{type:String,required:true},
    mobile:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}

},{
    timestamps:true
}
)

const userModel = mongoose.model("todo_users",userSchema)
module.exports = userModel