const jwt = require("jsonwebtoken");
const User = require("../models/Users");

require("dotenv").config();

module.exports = getdata => {
  getdata.get("/getStudentData", (req, res) => {
    jwt.verify(req.query.data, process.env.SECURITYKEY, (err, tokenData) => {
      if (!err) {
        var userData = User.find(
          {
            category: "student"
          },
          ["username", "email", "category", "status"]
        );
        userData.then(students => {
          let data = { category: tokenData.category, students: students };
          res.json(data);
        });
        userData.catch(err => {
          console.log("error in getting data from user table", err);
        });
      } else {
        res.json("invalidToken");
      }
    });
  });
};
