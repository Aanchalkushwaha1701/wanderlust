const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/reviews.js");
const {isLoggedIn,isreviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");


const validateReview= (req,res,next)=>{
let {error}= reviewSchema.validate(req.body);
   if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      console.log(errmsg);
      throw new ExpressError(404,errmsg);
   }else{
      next();
   }
  }
 


//post route for review
 router.post("/", isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

 
//delete route for reveiw
 router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapAsync(reviewController.destroyReview));
 
  module.exports=router;