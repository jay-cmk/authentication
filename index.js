const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const db_con = require("./models/db.js");
const AuthRouter = require("./routes/AuthRouter.js");

db_con();

// ✅ Allow frontend origin (adjust port if different)
app.use(cors({
  origin: "http://localhost:5173", // <-- Your React frontend URL
  credentials: true, // if you're using cookies or sessions
}));

app.use(bodyParser.json());
app.use("/auth", AuthRouter);

app.get('/',(req,res)=>{
  res.send("server running")
})

app.listen(process.env.PORT, () => {
  console.log("Server started on port 8080");
});
