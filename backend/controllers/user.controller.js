const userModel = require("../models/user.model");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistTokens.model");

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req); // contain errors only

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // return error
  }

  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await userModel.hashPassword(password);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken(); // fixed instance method call
  res.status(201).json({ token, user });
};

module.exports.loginUser = async function (req, res) {


  const prevToken = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (prevToken) {
    res.clearCookie("token");
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const isValidPassword = await user.comparePassword(password); // fixed
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid Email or Password" });
  }

  const token = user.generateAuthToken(); // fixed
  res.cookie("token", token, {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
  });

  res.status(200).json({ token, user });
};

module.exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports.logoutUser = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await blacklistTokenModel.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out Successfully" });
};

exports.addAddress = async (req, res) => {
  try {
    const { address, number } = req.body;

    if (!address && !number) {
      return res
        .status(400)
        .json({ message: 'At least one of address or number must be provided' });
    }

    // Find user by ID from the token
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (address !== undefined) user.address = address;
    if (number  !== undefined) user.number  = number;

    await user.save();

    // Optionally, omit password and other sensitive fields
    const { password, ...safeUser } = user.toObject();

    res.json({ message: 'Address updated', user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
