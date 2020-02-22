var mongoose = require("mongoose");
var validator = require("validator");
const Schema = mongoose.Schema;
mongoose.pluralize(null);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: value => {
        if (!validator.isEmail(value)) {
          throw new Error({ errir: "Invaid email address" });
        }
      }
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    category: {
      type: String,
      required: true,
      lowercase: true
    },
    status: {
      type: String,
      required: false,
      lowercase: true
    }
  },
  {
    versionKey: false,
    timestamps: false
  }
);

const user = mongoose.model("User", userSchema);
module.exports = user;
