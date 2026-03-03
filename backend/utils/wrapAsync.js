// This is for wrapAsync error handling function for async-await req.-res cycle call
// define a wrapAsync fun. for custom error  using an arrow fun.
module.exports = (fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);// call next for any error
        // fn(req,res,next) will return a promise so we can use then catch method
        // here if there is an error occur then directly it sent to next() middleware
    }
}
/*
function wrapAsync (fn)=>{
    return function(req,res,next)=>{
        // fn(req,res,next) will return a promise so we can use then catch method
        fn(req,res,next).catch(next);// call next for any error
        // here if there is an error occur then directly it sent to next() middleware
    }
}
 module.exports = wrapAsync(fn);
*/




