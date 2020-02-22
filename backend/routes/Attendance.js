// const Attendance = require("../models/Attendance");
const User = require("../models/Users");


module.exports = att => {
  att.post("/attendance", (req, res) => {
    var a = req.body.attendance;
    console.log(req.body.attendance)
    let attend = User.findOneAndUpdate({
      email:a.email
    },{status:a.status})

    attend.then(data => {
      console.log("data", data);
      // res.json(data);
      var userData = User.find(
        {
          category: "student"
        },
        ["username", "email", "category","status"]
      );
      userData.then(students => {
        res.json(students)
      });
    
    });
    attend.catch(err => console.log("err", err));
  });
};
