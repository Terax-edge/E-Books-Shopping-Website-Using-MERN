const userModel = require("../../models/usermodel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }

    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    console.log("checkPassword", checkPassword);

    if (!checkPassword) {
      throw new Error("Invalid password");
    }

    // ✅ Declare tokenData in the correct scope
    const tokenData = {
      _id: user._id,
      
      email: user.email,
    };

    // ✅ Generate JWT token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8, // 8 hours
    });

    // ✅ Cookie options
    const tokenOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None", // Add this if using cookies with cross-origin requests
    };

    // ✅ Send token as cookie and in response
    res
      .cookie("token", token, tokenOption)
      .status(200)
      .json({
        message: "Login Successful",
        data: tokenData,
        token: token,
        success: true,
        error: false,
      });

  } catch (err) {
    console.error("Error during login:", err.message);
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignInController;

