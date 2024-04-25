const express = require("express");
const todoModel = require("../models/todoModel");
const todoDeleteModel = require("../models/todoDeleteModel");
const router = express.Router();
const auth = require("../middleware/auth")


router.post("/message",auth, async (req, res) => {
  try {
    const newmsg = new todoModel(req.body);
    await newmsg.save();
    res.send("Created Todo Successfully");
  } catch (err) {
    res.send(err);
  }
});

router.post("/delete",auth, async (req, res) => {
  try {
    const newmsg = await todoDeleteModel.findOneAndDelete({_id:req.body.id});
    
    res.send("Deleted Todo Successfully");
  } catch (err) {
    res.send(err);
  }
});

router.post("/deleted",auth, async (req, res) => {
  try {
     await todoModel.findOneAndDelete({_id:req.body.id});
    
    res.send("Deleted Todo Successfully");
  } catch (err) {
    res.send(err);
  }
});

router.post("/complete",auth, async (req, res) => {
  try {
    const {_id} = req.body
    const todo = new todoDeleteModel(req.body);
    await todo.save();
    await todoModel.findOneAndDelete({_id:_id})
    res.send("Completed Todo");
  } catch (err) {
    res.send(err);
  }
});

router.post("/gettodocompleted",auth, async (req, res) => {
  try {
    const {email} = req.body
    const message = await todoDeleteModel.find({email:email});
    res.send(message);
  } catch (err) {
    res.send(err);
  }
});

router.post("/gettodo",auth, async (req, res) => {
  try {
    const {email} = req.body
    const message = await todoModel.find({email:email});
    res.send(message);
  } catch (err) {
    res.send(err);
  }
});

router.post("/edittodo",auth, async (req, res) => {
  try {

    const message = await todoModel.findOneAndUpdate({_id:req.body._id},req.body);
    res.send("Edited Succcess");
  } catch (err) {
    res.send(err);
  }
});
module.exports = router;
