const User=require("../models/user");


module.exports.renderSignup=(req,res)=>{
    res.render("users/signup.ejs");
 }
   

 //signup post route
 module.exports.signup=async(req,res)=>{
     try{
     let {username,password,email}=req.body;
      const newuser=new User({email,username});
      const registereduser=await User.register(newuser,password);
      req.login(registereduser,((err)=>{
         if(err){
             return next(err);
         }
          req.flash("success","welcome to the Wanderlust");
        res.redirect("/listings")
      }))
   
     }
     catch(e){
         req.flash("error",e.message);
         res.redirect("/signup");
     }
   }


   //login get
   module.exports.renderLogin=(req,res)=>{
       //   res.send("loginworking");
         res.render("users/login.ejs");
      }
    

      //login post

    module.exports.login=async(req,res)=>{
    req.flash("success","welcome to the page of wanderlust");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
   }

   //logout get
    module.exports.logout=(req,res,next)=>{
        req.logout((err)=>{
            if(err){
                next(err);
            }
            req.flash("success","you are loggedout");
            res.redirect("/listings");
        })
    }