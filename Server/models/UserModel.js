const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      requird: true,
    },
    email: {
      type: String,
      unique: true,
      lowerCase: true,
      index: true,
      validate: isEmail,
      required: [true, "provide email "],
    },
    password: {
      type: String,
      rquired: [true, "password can not be blank"],
    },
    status: {
      type: String,
      default: "online",
    },
    newMessages: {
      type: Object,
      default: {},
    },
    picture: {
      type: String,
    },
  },
  { minimize: false, timestamps: true }
);

//hash password before saving to db
userSchema.pre("save", async function (next) {
  const user = this;

  const isModified = user.isModified("password"); // true if password modified
  if (!isModified) return next();

  //hash password if created or modified password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// varify credentials
userSchema.statics.findByCredentials = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("No user with the provided email");
  const isMatch = await bcrypt.compare(password, user.password);
  //password not matched
  if (!isMatch) throw new Error("incorrect password");
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
