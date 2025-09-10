const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");

profileRouter.get("/profile", userAuth, async (req, res) => {
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
module.exports = profileRouter;
