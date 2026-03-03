const express = require("express");
const router = express.Router({mergeParams : true});
// here we use Router([option]) mergeParams - give permit parent's request url'sid'svalue to share to the child req;s url i.e router i.e in this page
 const wrapAsync = require("../utils/wrapAsync.js");// added common error return fun. rather multiple try-catch pair
 const{validReview, isloggedIn, isReviewAuthor} = require("../middleware.js");
 // require review model from models directory
const {createReview,destroyReview} = require("../Controllers/review.js");


// Reviews
// Post route for review 
router.post("/",isloggedIn,validReview,wrapAsync(createReview));
 //Delete Review Route
 router.delete("/:reviewId",isloggedIn,isReviewAuthor,wrapAsync(destroyReview));

 module.exports = router;
