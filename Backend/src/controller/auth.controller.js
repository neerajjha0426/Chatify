import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { sendWelcomeEmail } from '../emails/mailSender.js';
import dotenv from 'dotenv';
dotenv.config();



export const signup = async (req, res) => {
    console.log("Signup request body:", req.body); // Debugging line
   const {fullName, email, password} = req.body; 

   try {
    // Basic validation check for empty fields
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    // Password length validation
    if(password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters"});
    }


    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        return res.status(400).json({message:"Please enter a valid email"});
    }

    // Check if user already exists
    const user = await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }
    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword
    });

    if(newUser){
        await newUser.save();
        generateToken(newUser._id, res);
       

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            message:"User created successfully"
        });

        try {
            await sendWelcomeEmail(newUser.email, newUser.fullName, process.env.CLIENT_URL);
            console.log("Welcome email sent to:", newUser.email);
        } catch (error) {
            console.error("Failed to send welcome email:", error);
            
        }
    }else{
        res.status(400).json({message:"Invalid user data"});
    }




   } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({message:"Server Error"});
    
   }

}


export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        // Basic validation check for empty fields
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
            message:"Login successful"
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({message:"Server Error"});
    }
};



export const logout = (req, res) => {
    res.cookie('jwt', '', {maxAge:0});
    res.status(200).json({message:"Logout successful"});
};