const User = require("../models/Users");
var bcrypt = require("bcryptjs");

module.exports = signup => {
  signup.post("/signup", (req, res) => {
    var a = req.body.data;

    var salt = bcrypt.genSaltSync(10);
    var hashedPass = bcrypt.hashSync(a.password, salt);

    let postUser = new User({
      username: a.firstname + " " + a.lastname,
      category: a.category,
      email: a.email,
      password: hashedPass,
      status:"true"
    }).save();
    postUser.then(dbdata => {
      console.log(dbdata);
      res.json(dbdata);
    });
    postUser.catch(err => {
      console.error(err);
      res.json(err);
    });
  });
};
