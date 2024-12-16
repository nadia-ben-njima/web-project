const bcrypt = require("bcryptjs");
const Shopper = require("../models/Shopper");

// Register Shopper
const registerShopper = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if shopper already exists
    const existingShopper = await Shopper.findOne({ email });
    if (existingShopper) {
      return res.status(400).json({ msg: "Shopper already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new shopper
    const newShopper = new Shopper({ email, password: hashedPassword });
    await newShopper.save();

    res.status(201).json({ msg: "Shopper registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error registering shopper" });
  }
};

// Login Shopper
const loginShopper = async (req, res) => {
  const { email, password } = req.body;

  try {
    const shopper = await Shopper.findOne({ email });
    if (!shopper) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, shopper.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({ msg: "Shopper logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error logging in shopper" });
  }
};

module.exports = { registerShopper, loginShopper };
