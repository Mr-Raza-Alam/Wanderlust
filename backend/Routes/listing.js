// Router for listing of our project

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");// added common error return fun. rather multiple try-catch pair
const { isloggedIn, isOwner, validListing, validImgSize } = require("../middleware.js");
// require Listing model from models directory
const list = require("../../database/models/listing.js");
const { index, showListing, editForm, updateListing, destroyListing, createListing, newListForm, searchAction } = require("../Controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });// now the file or image(size = 1.4MB) will be uploaded on storage i.e on cloudinary
//const upload = multer({dest : 'upload/'});


// new Back Route --- return back to 
router.get("/newBack", (req, res) => {
  res.redirect("/listings");
});
// Back Route -- to come back to dashboard
router.get("/back", (req, res) => {
  //req.flash("success","Welcome to ...userName dashboard");
  res.redirect("/listings");
});

router.route("/")
  .get(index)// Index Route--- use to display all data from Database
  .post(isloggedIn, upload.single('listing[image]'), validImgSize, validListing, wrapAsync(createListing));// to manipulate with new created listing details

// New Route-- for getting a form for creating new information insertion from client site 
router.get("/new", isloggedIn, newListForm);
router.get("/search", wrapAsync(searchAction))

router.route("/:id")
  .get(wrapAsync(showListing))// show Route--- for all individual  list
  .put(isloggedIn, isOwner, upload.single('listing[image]'), validImgSize, validListing, wrapAsync(updateListing))// Update Route--- To update the value
  .delete(isloggedIn, isOwner, wrapAsync(destroyListing));// Delete Route --- 



// edit Back Route -- for return back to 
router.get("/:id/editBack", (req, res) => {
  let { id } = req.params;
  res.redirect(`/listings/${id}`);
});
// Edit Route--- to get edit form
router.get("/:id/edit", isloggedIn, isOwner, wrapAsync(editForm));


module.exports = router;

//   .post(upload.single('listing[image]'),(req,res)=>{
// res.send(req.file);
//});
// Create Route : to insert send data from client site to DB
// if(!req.body.listing){
//    throw new expressError(400,"Please send a valid listing.");
// }
// way1-- to extract data from req.body
// let {title,description,image,price,location,country} = req.body;
// way --- to extract data from req.body but for this in the .ejs file make all input field name of objectName[key] i.e. object type
// const collectedList  = req.body.listing;
// console.log(collectedList);