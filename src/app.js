const express=require('express');
const app=express();
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});

app.use("/info",(req,res)=>{
  res.send("This webssite is created by JAANHVI SHUKLA")
})
app.use("/acknowledgement",(req,res)=>{
  res.send("I would like to acknowledge my parents and teachers f their support")
});