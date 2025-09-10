const express=require('express');
const authRouter=express.Router();
const { ValidateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


authRouter.post("/signup", async (req, res) => {
  try {
    //Checking Validations...
    ValidateSignUpData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10); //10 is the salt rounds
    //creating a new instance of the user model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Signup failed " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailId is not present in DB");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$111");
      //ADD THE TOKEN TO THE COOKIE AND SEND THE RESPONSE BACK TO THE USER
      res.cookie("token", token);
      res.send("Login successful");
    } else {
      throw new Error("Password not correct");
    }
  } catch (err) {
    res.status(400).send("Login failed" + err.message);
  }
});

module.exports=authRouter;