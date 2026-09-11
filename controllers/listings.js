const Listing=require("../models/listing");

//index
  module.exports.index=async (req,res)=>{
     const allListings=await Listing.find({});
     res.render("listing/index.ejs",{allListings});
  };
  //new form render
   module.exports.renderNewForm=(req,res)=>{
        //res.send("sucess");
        res.render("listing/new.ejs");
     }
     //create new listing
      module.exports.createNewListing=async(req,res)=>{
          let url=req.file.path;
          let filename=req.file.filename;
          // console.log(url,"..",filename);
          
           let newlisting=new Listing(req.body.listing);
           newlisting.owner=req.user._id;
           newlisting.image={url,filename};
           await newlisting.save();
       
           req.flash("success","new listing created");
          //  console.log(req.body.listing);
          //  console.log(req.body);
           res.redirect("/listings");
        }
        //show listing
        module.exports.showListing=async (req,res)=>{
             let {id}=req.params;
             let listing=await Listing.findById(id).populate({
              path:"reviews",
              populate:{path:"author"},
           }).populate("owner");
             if(!listing){
              req.flash("error","listing u requested does not exist");
               return res.redirect("/listings");
             }
             res.render("listing/show.ejs",{listing});
          }

          //render edit form
           module.exports.renderEditForm=async (req,res)=>{
                let {id}=req.params;
                let listing= await Listing.findById(id);
                if(!listing){
                 req.flash("error","listing u requested  for edit does not exist");
                  return res.redirect("/listings");
                }
                let originalImageUrl=listing.image.url;
                originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")

                res.render("listing/edit.ejs",{listing,originalImageUrl});
            }
            //post edit form
           
            module.exports.createEditForm=async(req,res)=>{
                 let {id}=req.params;
                 if(req.body.listing.image===""){
                   delete req.body.listing.image;
                 }
            let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
           if(typeof req.file!=="undefined"){
            let url=req.file.path;
          let filename=req.file.filename;
          listing.image={url,filename};
          await listing.save();
           }
                  req.flash("success","listing updated");
                 res.redirect(`/listings/${id}`);
             
             }
             
           //delete listing  
 module.exports.destroyListing=async (req,res)=>{
     let {id}=req.params;
     let deletedlist=await Listing.findByIdAndDelete(id);
     console.log("deleted");
      req.flash("success","new listing deleted");
     res.redirect("/listings");
 }
