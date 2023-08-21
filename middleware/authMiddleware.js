const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const User = require("../models/userModel")

// password hashing
const hashPassword = async function () {    
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
return hashedPassword
};

// password verification and returns boolean
const verifyPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, password);
  };

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  
    // Set JWT as an HTTP-Only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
    });
  };

const verifyToken = async (req, res, next) => {
    // Read JWT from the 'jwt' cookie
    let token = req.cookies.jwt;
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
        req.user = await User.findById(decoded.userId).select('-password');
  
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json('Not authorized, token failed');
      }
    } else {
      res.status(401).json("Not authorized, no token");
    }
  }

  const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as an admin');
    }
  };

  module.exports = {hashPassword, verifyPassword, generateToken, verifyToken, isAdmin}