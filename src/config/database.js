const mongoose=require('mongoose');
const connectDB=async ()=>{
  await mongoose.connect("mongodb+srv://namastedev:hello%4011@namastenode.7rbnubs.mongodb.net/devtinder");
};
module.exports=connectDB();
