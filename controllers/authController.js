const User = require("../models/userModel")

const { hashPassword,
    verifyPassword,
    generateToken,
} = require("../middleware/authMiddleware")

// Register new User
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json('User already exists');
        }
        const hashedPassword = hashPassword(password)
        const user = await User.create({
            name,
            email,
            hashedPassword,
        });

        if (user) {
            generateToken(res, user._id);

            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(400).json('Invalid user data');
        }

    } catch (error) {
        console.log(error)
    }

};

//Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user && (await verifyPassword(password))) {
            generateToken(res, user._id);

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(401);
            throw new Error('Invalid email or password');
        }

    } catch (error) {
        console.log(error)
    }
}
// get user details only after login
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(404).json('User not found');
        }
    } catch (err) {
        console.log(err)
    }
}

// update user can only update name and password
const updateUser = async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        user.password = await hashPassword(req.body.password);
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404).json('User not found');
    }
  }

//   Logout
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {registerUser, login, updateUser, getUser, logoutUser}