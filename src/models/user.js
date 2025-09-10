const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
  firstName:{
    type:String,
  },
  lastName:{
    type:String,
  },
  emailId:{
    type:String,
    required:true,
    lowercase:true,
    unique:true,
  },    
  password:{
    type:String
  },
  age:{
    type:Number,

  },
  gender:{
    type:String,
    validate(value){
      if(!["male","female","other"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  photourl:{
    type:String,
  },
  about:{
    type:String,
    default:"this is default about the user",
  },
  skills:{

    type:[String],
    
  },
  timestamp:{
    type:Date,
    default:Date.now(),
  }
});
module.exports=mongoose.model("User",userSchema);