import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//   SIGNUP------------------------------------------------------------------------------------

export const signup = async (req, res) => {
  const { username, email, mobile, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Hash password----------------------------------------------------------------

  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user--------------------------------------------------------------

  const user = await User.create({
    username,
    email,
    mobile,
    password: hashedPassword,
  });

  // Generate token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Save token------------------------------------------------------------

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.status(201).json({
    message: "Signup successful",
    user,
    token,
  });
};

//    LOGIN------------------------------------------------------------------------------------

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Find user

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  // Compare password

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }

  // Generate token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // Save token in cookie

  res.cookie("token", token, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "Login successful",
    user,
    token,
  });
};

//    LOGOUT------------------------------------------------------------------------------------

export const logout = async (req, res) => {
  res.clearCookie("token");

  res.status(200).json({
    message: "Logout successful",
  });
};

// Get User--------------------------------------------------------
export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update User--------------------------------------------------------

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,

      req.body,

      {
        new: true,
      },
    );

    res.status(200).json({
      message: "Profile Updated Successfully",

      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};