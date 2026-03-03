
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./Reviews.js");
const User = require("./User.js");

 // create a listing schema 

 const listingSchema = new Schema({
    title : {
     type : String,
     require : true,
    },
    description : {
      type : String,
    },
    image : {
      url : String,
     filename : String, 
    },
   price :{
    type : Number,
   },
  location : {
   type : String,
    
  },
  country : {
    type : String,
  },
  reviews : [{
    type : Schema.Types.ObjectId,
    ref : "Review",
  },],
  owner : {
     type : Schema.Types.ObjectId,
     ref : "User",
  },
  geometry : {
     type : {
       type : String,// Don't do `{location : {type : String}}`
       enum : ['Point'],// 'Location.type' must be 'Point'
       required : true
     },
     coordinates : {
      type : [Number],
      required : true
     },
  },
 });
 // this mongoose middleware-- to delete all reviews data from DB of corresponding listing has been deleted.
 listingSchema.post("findOneAndDelete",async(listing)=>{
  // listing - listing data
  if(listing){
   await Review.deleteMany({_id : {$in : listing.reviews}});
  }
 });
// now create a model for collection
const Listing = mongoose.model("Listing",listingSchema);
// then now export the listing model to the module.exports = modelName
module.exports = Listing;

/**
type : String,
default : "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
set : (v)=>// for user/client
 v === "" ? "https://images.unsplash.com/photo-1502082553048-f009c37129b" : v,
 */