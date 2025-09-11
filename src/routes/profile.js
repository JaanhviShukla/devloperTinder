const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR " + err.message);
  }
});

profileRouter.patch("/profileupdate", userAuth, async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ]; //this is the list of the fields that can be updated
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update is not allowed");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED" + err.message);
  }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try{
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Edit Request");
  }

  const loggedInUser=req.user;
  Object.keys(req.body).forEach((key)=>(loggedInUser[key] = req.body[key]));
  await loggedInUser.save();
  res.send("Profile Edited Successfully");

  


}catch(err){
    res.status(400).send("ERROR "+err.message);
}}); 

profileRouter.patch("/profile/passwordchange",userAuth,async(req,res)=>{
  const user=req.user;
  const updatedPassword=req.body.password;
  const passwordHash = await bcrypt.hash(updatedPassword, 10); 
  user.password=passwordHash;
  await user.save();
  res.send("Password changed successfully");

});
module.exports = profileRouter;
