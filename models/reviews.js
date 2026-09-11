const mongoose=require("mongoose");

const reviewschema=new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5

    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})
 module.exports=mongoose.model("Review",reviewschema);