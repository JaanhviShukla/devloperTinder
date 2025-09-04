const express=require('express');
const app=express();
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});

app.get("/user",(req,res)=>{
    res.send("User information");
});
app.post("/user",(req,res)=>{
    res.send("User created");
});

