const express = require("express");
var cors = require('cors');
var app = express();
app.use(express.json());
app.use(cors())
require("./connections/db");  // importing database connection

// importing users route for signup detail
var signup = express.Router();
require('./routes/Signup')(signup);
app.use('/', signup);

// route for signin
var signin = express.Router();
require('./routes/Signin')(signin);
app.use('/', signin);

// route for Attendance
var att = express.Router();
require('./routes/Attendance')(att);
app.use('/', att);

// route for send data to fronend
var getdata = express.Router();
require('./routes/GetData')(getdata);
app.use('/', getdata);



app.listen((PORT = 8010), err => {
  if (!err) {
    console.log(`Your app is running on port : ${PORT}`);
  }
});
