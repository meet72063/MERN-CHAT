const { User } = require("../models/UserModel");

const createUser = async (req, res) => {
  const { name, email, password, picture } = req.body;

  try {
    const user = await User.create({ name, email, password, picture });
    //convert to plan object
    const userWithoutPassword = { ...user.toObject() };
    //delete password property
    delete userWithoutPassword.password;
    res.status(201).json({ user: userWithoutPassword });
  } catch (error) {
    let msg;
    if (error.code === 11000) msg = "user already exist ";
    else msg = error.message;
    console.log(error);
    res.status(401).json({ msg });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();

    const userWithoutPassword = { ...user.toObject() };
    //delete password property
    delete userWithoutPassword.password;

    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error.message });
  }
};

module.exports = { login, createUser };
