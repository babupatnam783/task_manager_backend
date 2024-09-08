const jwt = require('jsonwebtoken');
const express = require('express');
const userLoginRoute = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('../../model/auth/user_model');

userLoginRoute.post('/', async (req, res) => {
    const { Email, Password } = req.body;

    try {
        const user = await userModel.findOne({ Email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }
        // Compare the hashed password with the provided password
        const isPasswordMatch = await bcrypt.compare(Password, user.Password);
        if (!isPasswordMatch) {
            // If password doesn't match, return 402 for invalid credentials
            return res.status(402).json({ message: 'Invalid password' });
        }

        // Generate JWT token if login is successful
        const token = jwt.sign({ userId: user._id }, 'taskManger', { expiresIn: '1h' });

        // Send success response
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            FirstName: user.FirstName,
            Email: user.Email
        });
        
    } catch (err) {
        // Handle any unexpected errors
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
});

module.exports = { userLoginRoute };