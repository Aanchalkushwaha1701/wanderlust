const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Review=require("../models/reviews.js");
const {isLoggedIn ,isOwner}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

const validatelisting=(req,res,next)=>{
   let {error}= listingSchema.validate(req.body);
   if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      console.log(errmsg);
      throw new ExpressError(404,errmsg);
   }else{
      next();
   }
 }
 // show index route,create index

 router
  .route("/")
  .get(wrapAsync(listingController.index)) //show all listing
  .post(isLoggedIn,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.createNewListing)); //post new listing


  //new route
   router.get("/new",isLoggedIn,listingController.renderNewForm);
  
 //show,edit post,delete form
  router
  .route("/:id")
  .get(isLoggedIn, wrapAsync(listingController.showListing))
  .put(isLoggedIn,isOwner,upload.single("listing[image]"),validatelisting,wrapAsync(listingController.createEditForm))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));
 

  
  //edit route
 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
 
 
   
  module.exports=router;