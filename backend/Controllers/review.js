// in this  file we write backened core functionality for the reviews
const list = require("../../database/models/listing.js");
const Review = require("../../database/models/Reviews.js");// TIHS is for review

module.exports.createReview = async (req, res) => {
   let { id } = req.params;
   let listing = await list.findById(id); // this is for selected listing item for which users will submit the review
   const { review } = req.body;
   let newReview = new Review(review);// review is an object in which our rating and comment data are present
   newReview.author = req.user._id;// for each new review that created by an user also set its author(user's details) to each review
   listing.reviews.push(newReview);

   await newReview.save();
   await listing.save();
   req.flash("success", "New Review Posted!!");
   res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
   let { id, reviewId } = req.params;
   await list.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
   await Review.findByIdAndDelete(reviewId);// actually delete the review document from DB
   req.flash("remove", "A Review has been deleted!!");
   res.redirect(`/listings/${id}`);
};

