require("dotenv").config({ path: "../../.env" }); // Ensure environment variables are loaded
const mongoose = require("mongoose");
const listen = require("../models/listing.js");// listen is collection 
const initData = require("./data.js");// new data

const dbUrl = process.env.ATLASDB_URL;
console.log(dbUrl);
if (!dbUrl) {
   console.error("MongoDB connection string is undefined. Check your .env file.");
   process.exit(1); // Stop the script
}
async function main() {
   //"mongodb://127.0.0.1:27017/wanderTust"
   await mongoose.connect(dbUrl);
}
// call main function
main().then((res) => {
   console.log("DB Connection has been done successfully!!");
}).catch((err) => {
   console.log(err);
});

// create an asyncFuntion calledinitDB
const initDB = async () => {
   // first delete all data first
   await listen.deleteMany({});
   // here before add all new data
   initData.data = initData.data.map((obj) => ({ ...obj, owner: "6849e4f186e61e0ad0bd11f8" }));
   // add all new data 
   await listen.insertMany(initData.data);
   console.log("DATA (s) has been inserted into Databse.");
}

// call initBD()
initDB();