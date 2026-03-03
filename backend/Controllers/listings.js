// in this  file we write backened core functionality for the listings
const { options } = require("joi");
const list = require("../../database/models/listing.js");

const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding'); // here we access the service for geocoding
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); // here we start the the geocoding services by passing my mapToken

module.exports.index = async (req, res) => {
  const allList = await list.find({});
  res.render("listings/listPlace.ejs", { allList });
};

module.exports.newListForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  let response = await geocodingClient.forwardGeocode({// it will convert the given location into its coordinate and give ar array result
    query: req.body.listing.location,
    limit: 1
  }).send()
  let url = req.file.path;
  let filename = req.file.filename;
  const newList = new list(req.body.listing);// here newList is an instance of list module
  newList.image = { url, filename };// file details for image
  newList.owner = req.user._id;// here we need to store current user's id
  newList.geometry = response.body.features[0].geometry;// coordinate details for given location
  let savedListing = await newList.save();
  //console.log(savedListing);
  req.flash("success", "New Listing Created!!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  // here we perform nested populate i.e for each review the should also associated with its author i.e who had posted the review
  const showList = await list.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
  if (!showList) {
    req.flash("error", "Listing that you requested for does not exits!");
    return res.redirect("/listings");// redirect to index page
  }
  res.render("listings/showPlace.ejs", { showList });
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  const editing = await list.findById(id);
  if (!editing) {
    req.flash("error", "Listing that you requested for editing does not exits!");
    return res.redirect("/listings");// redirect to index page  
  }
  let originalImageUrl = editing.image.url;
  if (originalImageUrl.includes("res.cloudinary.com")) {
    // It's a Cloudinary image, use transformation
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_300");
  } else if (originalImageUrl.includes("images.unsplash.com")) {
    // It's an Unsplash image, resize using query param
    if (originalImageUrl.includes("w=")) {
      // Replace existing width param
      originalImageUrl = originalImageUrl.replace(/h=\d+/, "h=100").replace(/w=\d+/, "w=180");
    } else {
      // No width param, append it
      originalImageUrl += (originalImageUrl.includes("?") ? "&" : "?") + "h=100&w=180";
    }
  }
  res.render("listings/editList.ejs", { editing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  const listItem = await list.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file != "undefined") {// req.file exist then explicity add value of image attribute
    let url = req.file.path;
    let filename = req.file.filename;
    listItem.image = { url, filename };
    await listItem.save();
  }
  req.flash("update", "A Listing has been Updated successfully!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  // now delete
  await list.findByIdAndDelete(id);// so here a post mongoose middleware is also created to delete all review corresponding to this listing or listing_id
  req.flash("remove", "Listing deleted");
  res.redirect("/listings");
};

module.exports.searchAction = async (req, res) => {
  let { searchLocation } = req.body;
  let requestedListing = await list.find({ location: { $regex: searchLocation, $options: "i" } });
  if (requestedListing.length === 0) {
    req.flash("error", "Ooops!No such listings are avialable on requested location.");
    return res.redirect("/listings");
  }
  res.render("listings/searchList.ejs", { requestedListing });
};

//  originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250")// since originalImageUrl is a string so i can apply string method to transforme(height,width,color,crop-related properties) the existing image
