const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");


app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

connectDB
  .then(() => {
    console.log("Database conneted");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connection failed");
  });


// FEED API to find all the users from database
/* app.get("/feed", userAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
 */

