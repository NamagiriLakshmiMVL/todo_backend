const express = require("express");
const app = express();

const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const signupRoute = require("./routes/signupRoute");
const messageRoute = require("./routes/messageRoute");

app.use(cors());
app.use(express.json());
app.use("/user", signupRoute);
app.use("/todo", messageRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Mongoose is Connected");
  app.listen(process.env.PORT, () =>
    console.log("Mongoose is Connected on the port", process.env.PORT)
  );
});
