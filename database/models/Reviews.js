// Model for review
const { ref } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./User.js");

const reviewSchema = new Schema({
   comment : String,
   rating : {
    type : Number,
    min : 1,
    max : 5
   },
 createAt : {
    type : Date,
    default : Date.now,// without () so Mongoose calls it fresh for each new review
 },
 author : {
   type : Schema.Types.ObjectId,
   ref : "User",

 }
});

module.exports = mongoose.model("Review",reviewSchema);