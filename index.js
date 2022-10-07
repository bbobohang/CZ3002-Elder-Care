const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}
//Connecting to mongodb
connectDB();

//To allow parsing application/json and cookies
app.use(express.json());
app.use(cookieParser());
//Define routes
app.use("/api/auth", require("./routes/auth/auth"));
app.use("/api/record", require("./routes/patient/record/record"));
app.use("/api/med", require("./routes/patient/med/med"));
app.use("/api/symptoms", require("./routes/patient/symptoms/symptoms"));
app.use("/api/teledoc", require("./routes/doctor/appointments/teledoc"));
app.use("/api/homedoc", require("./routes/doctor/appointments/homedoc"));
app.use("/api/appt", require("./routes/patient/appointments/appointments"));

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
