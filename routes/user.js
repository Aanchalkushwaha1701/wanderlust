const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
 const passport=require("passport");
 const {savedredirectUrl}=require("../middleware.js");
  const userController=require("../controllers/user.js");


  //signup
    router
    .route("/signup")
    .get(userController.renderSignup)//signup page
    .post(userController.signup);//signup post


 
 router
 .route("/login")
 .get(userController.renderLogin)//login get
 .post(savedredirectUrl,       //login post
    passport.authenticate("local",
    {failureRedirect:"/login",
    failureFlash:true})
    ,userController.login);

  
  
    //logout get
    router.get("/logout",userController.logout);

   module.exports=router;
