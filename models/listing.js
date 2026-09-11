const mongoose=require("mongoose");
// const { listingSchema } = require("../schema");
 const Review = require("./reviews.js");
const listSchema=new mongoose.Schema({
    title:{
        type:String,
         required:true,
    },
    description:{
        type:String,
         required:true,
    },
    image:{
        // type:String,
        // default:"https://images.unsplash.com/photo-1779044991881-b1d0763fefe4?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // set: (v)=> v==="" ?"https://images.unsplash.com/photo-1779044991881-b1d0763fefe4?q=80&w=2129&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D":v,
    url:String,
    filename:String

    },

    price:Number,
    location:String,
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

    
})
listSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})
const Listing=mongoose.model("Listing",listSchema);
module.exports=Listing;