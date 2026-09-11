const mongoose=require("mongoose");
 const passportLocalMongoose=require("passport-local-mongoose").default;



 const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
    // username,password and some method will automatically be genereated  through using plugin
 })
    userSchema.plugin(passportLocalMongoose);
  module.exports=mongoose.model("User",userSchema);