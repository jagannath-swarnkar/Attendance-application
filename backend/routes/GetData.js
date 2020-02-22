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
          ["username", "email", "category","status"]
        );
        userData.then(students => {
          let data = { category: tokenData.category, students: students };
          console.log("---", students);
          res.json(data)
        });
      } else console.log(err);
    });
  });
};
