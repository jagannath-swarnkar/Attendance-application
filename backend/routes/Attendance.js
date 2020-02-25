// const Attendance = require("../models/Attendance");
const User = require("../models/Users");

module.exports = att => {
  att.post("/attendance", (req, res) => {
    var a = req.body.attendance;
    let attend = User.findOneAndUpdate(
      {
        email: a.email
      },
      { status: a.status }
    );

    attend.then(data => {
      var userData = User.find(
        {
          category: "student"
        },
        ["username", "email", "category", "status"]
      );
      userData.then(students => {
        res.json(students);
      });
    });
    attend.catch(err =>
      console.log(
        "err in posting attendance status of student into user table",
        err
      )
    );
  });
};
