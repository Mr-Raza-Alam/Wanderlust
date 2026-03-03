// Model for user authentication

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
   email_id : {
    type : String,
    required : true,
   },
   phone_No :{
    type: String,
    required: [true, "Mobile number is required"],
    unique: true,
    match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"],
    default: "7004091859" // Set your default mobile number here
   },

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);