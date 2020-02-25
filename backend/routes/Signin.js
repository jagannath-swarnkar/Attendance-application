const User = require("../models/Users");
var bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = signin => {
  signin.post("/signin", (req, res) => {
    console.log("data comming from body :\n", req.body.data);
    var a = req.body.data;

    let postUser = User.find({ email: a.email });
    postUser.then(dbdata => {
      if (dbdata.length > 0) {
        var verifyPass = bcrypt.compareSync(a.password, dbdata[0].password);
        if (verifyPass) {
          let data = {
            username: dbdata[0].username,
            category: dbdata[0].category,
            email: dbdata[0].email
          };
          jwt.sign(
            data,process.env.SECURITYKEY,{expiresIn:'1d'},
            (err, token) => {
              res.json([token]);
            }
          );
        } else {
          res.json(verifyPass);
        }
      } else {
        res.json(false);
      }
    });
    postUser.catch(err => {
      console.error(err);
      res.json(err);
    });
  });
};
