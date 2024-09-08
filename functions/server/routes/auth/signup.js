const express = require('express');
const userSignupRoute = express.Router();
const bcrypt = require('bcrypt');
const { userModel } = require('../../model/auth/user_model');

userSignupRoute.post('/', async (req, res) => {
    const { FirstName, LastName, Email, Password } = req.body;
    console.log("rea body",req.body)

    // Check for missing required fields
    if (!FirstName || !LastName || !Email || !Password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Check if user already exists
        const userExist = await userModel.findOne({ Email });
        if (userExist) {
            return res.status(409).json({ message: 'UserID already exists' });
        }

        // Hash the password
        bcrypt.hash(Password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({ message: 'Error hashing password', error: err.message });
            }

            // Create and save the new user
            const newUser = new userModel({
                FirstName,
                LastName,
                Email,
                Password: hash
            });

            try {
                await newUser.save();
                return res.status(201).json({ message: 'User registered successfully' });
            } catch (saveError) {
                return res.status(500).json({ message: 'Error saving user', error: saveError.message });
            }
        });

    } catch (err) {
        return res.status(500).json({ message: 'User registration failed', error: err.message });
    }
});

module.exports = { userSignupRoute };
