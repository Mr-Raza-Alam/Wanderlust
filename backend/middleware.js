// this is for middleware common for important component
const list = require("../database/models/listing.js");
const Review = require("../database/models/Reviews.js");// TIHS is for review
const expressError = require("./utils/expressError.js"); // added custom error class
const { listingSchema, reviewSchema } = require("./schema.js");// schema for server-site validation
// here isloggedIn is a function name
module.exports.isloggedIn = (req, res, next) => {
  // check req.user -- that provide current user info. that are stored into the session
  //console.log(req.user);
  if (!req.isAuthenticated()) {// here verify an user is logged in or signed up or not
    // redirect to the request path that selected by current user
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "you must be logged in to create listing. Signup (for New User)");
    return res.redirect("/listings/login");
  }
  next();
};

// now since once an user has loggedin then The passport automatically changed the current session and therefore req.session.redirectUrl will have undefined value b/c passport also vanished them
// so we need to use an middleware with req.locals.redirectUrl that saved the redirectUrl = req.originalUrl value to it and can accessible anywhere in the application
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {// redirectUrl exits then store in a variable and then next() middleware function
    res.locals.redirectUrl = req.session.redirectUrl;
  } next();
};

// for authorisation for our listing
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let validListing = await list.findById(id);
  if (!validListing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You'r not the owner of this listing.So you cannot  edit/delete it.");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
// defined a listingValidation fun. for listingSchema validation of server site validation
module.exports.validListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  //console.log(error);
  if (error) {// if there exist any error
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(403, errMsg);
  } else {// otherwise procced to next operation
    next();
  }
}

// defined a reviewValidation fun. for reviewSchema validation of server site validation
module.exports.validReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  //console.log(error);
  if (error) {// if there exist any error
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new expressError(403, errMsg);
  } else {// otherwise procced to next operation
    next();
  }
};

// for authorisation for each review
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You'r not the owner of this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

// for file upload middleware to verify the uploaded file size
module.exports.validImgSize = (req, res, next) => {
  if (!req.file) {
    req.flash("error", "Image is required.");
    return res.redirect("/listings/new");
  }
  const max = 1000 * 1024;
  if (req.file.size > max) {
    req.flash("error", "Image size must be under 1.4 MB.");
    return res.redirect("/listings/new");
  }
  next();
};