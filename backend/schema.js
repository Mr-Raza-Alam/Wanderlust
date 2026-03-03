// Schema for server site validation

const Joi = require('joi');

// write a Schema which you want to validate
// now export it

module.exports.listingSchema = Joi.object({
   // define an object as like your collection'S name as in MongoDB
   listing : Joi.object({
    title : Joi.string().required(),
   description : Joi.string().required(),
   price : Joi.number().min(0).required(),
   country : Joi.string().required(),
   location : Joi.string().required(),
   }).required(),
});

// server-site validation for review 
module.exports.reviewSchema = Joi.object({// so reviewSchema is an object
   review : Joi.object({// here again review is also an object
    // now declare all fields i.e key-value pair
      rating : Joi.number().required().min(1).max(5),// i also applied range of rating from 1--5
      comment : Joi.string().required(),
   }).required(),// here .required() is applied to validate for review must be present whenever a review is submitted
});

//   image : Joi.string().allow("",null).required(),
