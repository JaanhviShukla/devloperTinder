const validator =require('validator');
const ValidateSignUpData=(req)=>{
  const{firstName,lastName,emailId,password}=req.body;
  
  if(!firstName||!lastName){
    throw new Error("Enter Name");

  }
  //now validate EmailId
  else if(!validator.isEmail(emailId)){
    throw new Error("EmailId is not valid");
  }
  else if(!validator.isStrongPassword(password)){
    throw new Error("Please enter strong password");
  }
};
module.exports={
  ValidateSignUpData,
}