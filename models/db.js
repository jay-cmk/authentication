// uOHI0KGtFxBWkK53
const mongoose = require("mongoose");
require('dotenv').config();

// 


const mongo_url= process.env.MONGO_CONN;
const dbconnect=()=>{
    mongoose.connect( mongo_url)
.then(()=>{
    console.log("db connect");
}).catch((err)=>{
    console.log(err);
})

}


module.exports = dbconnect;