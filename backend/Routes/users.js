// This is for signup page

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const {signedUp, renderLoginForm, renderSignupForm, loggedIn, logOut} = require("../Controllers/user.js");

router.route("/signup")// we perform routs chaining based on same path
      .get(renderSignupForm)
      .post(wrapAsync(signedUp));

router.route("/login")
      .get(renderLoginForm)
      .post(saveRedirectUrl,passport.authenticate("local",{failureRedirect : '/listings/login',failureFlash : true}),loggedIn);

router.get("/logout",logOut);

module.exports = router;


//router.get("/signup",renderSignupForm);
//router.post("/signup",wrapAsync(signedUp));
// router.get("/login",renderLoginForm);
// router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect : '/listings/login',failureFlash : true}),loggedIn);


