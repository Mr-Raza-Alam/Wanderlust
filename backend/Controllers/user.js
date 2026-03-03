// in this  file we write backened core functionality for the users
const User = require("../../database/models/User.js");

module.exports.renderSignupForm = (req, res) => {
   res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) => {
   res.render("users/login.ejs");
};

module.exports.signedUp = async (req, res, next) => {// this is an async b/c here DB is playing role
   try {// here i include custom validation
      let { username, email_id, phone_No, password } = req.body;
      const newUser = new User({ email_id, phone_No, username });
      const registeredUser = await User.register(newUser, password);
      //console.log(registeredUser);
      req.login(registeredUser, (err) => {// it automatically logged in also as after an user has signedup into the page
         if (err) {
            return next(err);
         }
         req.flash("success", "Welcome to Wanderlust Page");
         res.redirect("/listings");
      });
   } catch (err) {
      req.flash("error", err.message);
      res.redirect("/listings/signup");
   }
};

module.exports.loggedIn = async (req, res) => {
   // to check redirectUrl is undefined or not
   let redirectUrl = res.locals.redirectUrl || "/listings";
   //let {email_id,password} = req.body; no require to verify the login credential explicitly it is automatically done by passport.authenticate('strategy',{options})mehtod
   req.flash("success", "Welcome back to Wonderlust! You'r successfully logged in.");
   res.redirect(redirectUrl);// will redirect directly on requested page by user
};

module.exports.logOut = (req, res, next) => {
   req.logout((err) => {
      if (err) {
         return next(err);
      }
      req.flash("success", "You'r logged out succesfully!!");
      res.redirect("/listings");
   });
};