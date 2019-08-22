const { validationResult } = require("express-validator");
const BucketList = require("../models/BucketList");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json([{ msg: "Invalid Email / Password" }]);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json([{ msg: "Invalid Email / Password" }]);
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  login
};
