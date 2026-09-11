const express=require("express");
 const app=express();
 const session=require("express-session");
  const cookieParser=require("cookie-parser");
   const flash=require("connect-flash");
const path=require("path");
    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));
  // app.use(cookieParser("secretcode"));
  const sessionoption={
   secret:"mysupersecretcode",
   resave:false,
   saveUninitialized:true,
   
 }
   app.use(session(sessionoption));
   app.use(flash());

    app.get("/register",(req,res)=>{
      let {name="anonymous"}=req.query;
      req.session.name=name;
      console.log(name);
      req.flash("success","user registerd succesfully");
      res.redirect("/hello");
    })
    app.get("/hello",(req,res)=>{
   res.render("page.ejs",{name:req.session.name,msg:req.flash("success")});
    })
// app.get("/test",(req,res)=>{
//   res.send("test sessionid");
// })
//  app.get("/sessioncount",(req,res)=>{
//   if(req.session.count){
//     req.session.count++;
//   }
//   else{
//     req.session.count=1;
//   }
//    res.send(`you requested count ${req.session.count} times`);
//  })
  
  app.listen(3000,()=>{
    console.log("listening on port 3000");
  })