// 
if (process.env.NODE_ENV != "production") {
   require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
}
//console.log(process.env.MAP_TOKEN);


const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const expressError = require("./utils/expressError.js"); // added custom error class

const ejsMate = require("ejs-mate");
const listingsRouter = require("./Routes/listing.js");
const reviewsRouter = require("./Routes/reviews.js");
const usersRouter = require("./Routes/users.js");
const session = require("express-session");
const mongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("../database/models/User.js");

// now established Web server at some port 

app.engine("ejs", ejsMate);//define an engine for ejsMate Of EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../frontend/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/public")));
app.use(methodOverride("_method"));

//  const dbUrl = process.env.ATLASDB_URL;
//  if (process.env.NODE_ENV === "production") {
//   app.set("trust proxy", 1);
// }

//  const store = mongoStore.create({
//    mongoUrl : dbUrl,
//    crypto : {
//      secret : process.env.SECRET  ,     
//    },
//    touchAfter : 24 * 3600, // i.e. 24 hrs
// });
// store.on("error",()=>{
//   console.log(`ERROR in mongo Session Store and error is : ${err}`)
// });
const sessionOption = {
   //store,
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false,// not true b/c it prevent from empty session info storage
   cookie: {
      // Date.now() return current date + after how much ms time the session will deleted automatically let say 7days
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,// use to prevent from cross-scripting attacks i.e for security purpose.
      secure: process.env.NODE_ENV === "production",
   },
}

// now established DataBase connection
async function main() {
   //   "mongodb://127.0.0.1:27017/wanderTust"
   await mongoose.connect("mongodb://127.0.0.1:27017/wanderTust");
}
// call main function
main().then((res) => {
   console.log("DB Connection has been done successfully!!");
}).catch((err) => {
   console.log(err);
});


app.use(session(sessionOption)); // to use session i.e a middleware
app.use(flash()); // this is again a middleware

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {// use this middleware to display the flash msg
   res.locals.success = req.flash("success");
   res.locals.remove = req.flash("remove");
   res.locals.update = req.flash("update");
   res.locals.error = req.flash("error");
   res.locals.currUser = req.user;// here currUser is a variable that store the info. of current user that logged in 
   next();
});
//------Above this line all are middleware and below this all are req-res routes 


app.get("/", (req, res) => {// for icon
   //req.flash("success","Welcome to wanderlust's home-page");
   res.render("listings/home_page.ejs");
});

// for authentication 
app.use("/listings", usersRouter);

// for listings
app.use("/listings", listingsRouter);
// for reviews
app.use("/listings/:id/reviews", reviewsRouter);

// now use custom expressError class for all type of request and routes(like /something Not for like /somtheing/abcld)
app.all("/*path", (req, res, next) => {
   next(new expressError(400, "Page Not Found"));
});
// Erro middleware 
app.use((err, req, res, next) => {
   let { statusCode = 500, message = "Something type wrong!!" } = err;
   res.status(statusCode).render("listings/error.ejs", { message });
   //  res.status(statusCode).send(message);
   // res.send(`Something went wrong.!! ${err}`);// use it i) when try-catch is used ii) when warpAsync is used iii)  when custom error class is used
});

app.listen(3300, () => {
   console.log("Web server has been started at port : 3300.");
});

/*
(dbUrl,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
// for demoUser--registeration
// app.get("/demouser",async(req,res)=>{
//    let fakeUser = new User({
//       email_id : "student54@gmail.com",
//       username : "Delta-Student",
//    });
//    // to store fakeUser
//    let registeredUser = await User.register(fakeUser,"hellowork"); 
//    res.send(registeredUser);
// });


//   app.use((err,req,res,next)=>{
//  let {statusCode = 500,message="Something type wrong!!"} = err;
//    res.status(statusCode).render("listings/error.ejs",{message});
//    //  res.status(statusCode).send(message);
//    // res.send(`Something went wrong.!! ${err}`);// use it i) when try-catch is used ii) when warpAsync is used iii)  when custom error class is used
//  });

//  //Route--- /Test/listing
//  app.get("/test/listing",async(req,res)=>{
//    let sample1 = new list({// a sample1 is inserted to test it
//      title : "My new Villa",
//      description : "By the beeche , a very beautiful naturic location.please visit once ",
//      price : 1200,
//      location : "Calangute, Goa",
//      country : "India",
//    });
//    // save 
//   await sample1.save().
//    then((res)=>{
//      console.log("Successfully the sample data has been saved");
//    }).catch((err)=>{
//     console.log(err);
//    });
//  // now response something to client site on request
//    res.send("Hurray!!You have successfully done everything properly.");
//  });

*/