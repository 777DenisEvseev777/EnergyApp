const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = "SECRET";

const createUser = async(req, res) => {
    try {
        const { login, phone, password, passwordConfirm, role } = req.body;

        const user = await User.findOne({login});
        
        if (user){
            return res.status(400).json({message: 'User already exists'});
        }

        if (password != passwordConfirm){
            return res.status(400).json({message: 'Password not confirmed'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({login, phone, password: hashedPassword, role});

        await newUser.save();

        res.status(201).json({message: "User created successfully"});
    }
    catch (error){
        console.error("Server error:", error);  
        res.status(500).json({message: 'Error authenticating user'});
    }
}

const authenticationUser = async(req, res) =>{
    try{
        const {login, password} = req.body;

        const user = await User.findOne({login});

        if (!user){
            return res.status(404).json({message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({userId:user._id}, JWT_SECRET, {expiresIn: "12h"});

        res.status(200).json({ token, userId: user._id });
    }
    catch{
        res.status(500).json({message: "Error"});
    }
}

module.exports = {createUser, authenticationUser};