const Review =require("../models/reviews");
const Listing=require("../models/listing");


//post review
module.exports.createReview=async(req,res)=>{
   let listing= await Listing.findById(req.params.id);
   let newreview= new Review(req.body.review);
   newreview.author=req.user._id;
   listing.reviews.push(newreview);
   await listing.save();
   await newreview.save();
   console.log("reviews saved");
    req.flash("success","new review created created");
   res.redirect(`/listings/${listing._id}`);
 
 }

 module.exports.destroyReview=async(req,res)=>{
   let {id,reviewId}=req.params;
   await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
     req.flash("success"," review deleted");
      res.redirect(`/listings/${id}`);
 }