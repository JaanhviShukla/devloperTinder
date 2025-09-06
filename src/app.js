const express=require('express');
const connectDB=require("./config/database");
const app=express();
connectDB.then(()=>{
    console.log("Database conneted");
    app.listen(3000,()=>{
        console.log("Server is running on port 3000");
    });
} )
.catch((err)=>{
    console.error("Database connection failed");
});
const User=require("./models/user");
app.use(express.json());
app.post("/signup",async(req,res)=>{
    console.log(req.body);

    const user=new User(req.body);
    try{
        await user.save();
        res.send("User signed up successfully");
    }catch(err){
        console.error("Error signing up user:", err);
        res.status(500).send("Internal Server Error");
    }
});

