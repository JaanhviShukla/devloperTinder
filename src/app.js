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
app.get("/user",async(req,res)=>{
    const userEmail=req.body.emailId;
    try{
        const users=await User.find({emailId:userEmail});
        if(users.length===0){
            res.status(404).send("User not found");
        }else{
            res.send(users);}
            }
            catch(err){
                res.status(400).send("something went wrong");
            }        
    }
);

// FEED API to find all the users from database
app.get("/feed",async(req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("something went wrong");
    }
})


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

