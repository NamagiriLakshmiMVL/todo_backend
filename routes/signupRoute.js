const express = require("express");
const userModel = require("../models/userModel");
const todoModel = require("../models/todoModel");
const  genpassword  = require("../helper");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")

router.post("/signup", async (req, res) => {
  try {
    
    const {password,email,mobile,name} = req.body
    const token = jwt.sign({email:email},process.env.SECRET_KEY)
    const check = await userModel.findOne({email:email})
    if(check){
      res.send({message:"Email already exists"})
      return
    }
    const hashedpassword = await genpassword(password)
    const newuser = new userModel({password:hashedpassword,email,mobile,name});
    newuser.save();
    
    
    res.send({message:"User Created Successfully",token:token});
  } catch (err) {
    res.send({message:"Invalid Credentials"});
    
  }
});

router.post("/login", async (req, res) => {
  try {
    const {password,email} = req.body
    const user = await userModel.findOne({ email: email });
    if(user){
      const storedDbPassword = user.password
      const ismatch = await bcrypt.compare(password,storedDbPassword)
      if(!ismatch){
        res.send({message:"Invalid credentials"})
        return
      }
      const token = jwt.sign({id:user._id},process.env.SECRET_KEY)
      
      res.send({message:"Login Success",token:token})
      
    }
    else
    {
      res.send({message:"Invalid credentials"})
      return
    }
   
  } catch (err) {
    res.send(err);
    console.log(err)
  }
});

module.exports = router