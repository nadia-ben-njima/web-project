const bcrypt = require('bcryptjs');
const Shopper = require('../models/Shopper');
const crypto = require('crypto');
const nodemailer = require('nodemailer');


function generateResetToken() {
  return crypto.randomBytes(32).toString('hex');
}


const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    
    const user = await Shopper.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const token = generateResetToken();
    const expiration = Date.now() + 3600000; 

    
    user.resetToken = token;
    user.resetTokenExpiration = expiration;
    await user.save();

    // nodemailer transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Password Reset Request',
      text: `To reset your password, click the link: 
             http://localhost:3000/reset-password/${token}`
    };

    
    await transporter.sendMail(mailOptions);

    
    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error processing your request' });
  }
};


const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    
    const user = await Shopper.findOne({ 
      resetToken: token, 
      resetTokenExpiration: { $gt: Date.now() } 
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;  // Remove the reset token after password is updated
    user.resetTokenExpiration = undefined;  // Remove the expiration

    
    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error resetting password' });
  }
};


const registerShopper = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const existingShopper = await Shopper.findOne({ email });
    if (existingShopper) {
      return res.status(400).json({ msg: "Shopper already exists" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newShopper = new Shopper({ email, password: hashedPassword });
    await newShopper.save();

    res.status(201).json({ msg: "Shopper registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error registering shopper" });
  }
};


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


module.exports = { 
  requestPasswordReset, 
  resetPassword, 
  registerShopper, 
  loginShopper 
};
