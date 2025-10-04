import { generateToken } from '../lib/utils.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';


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
        generateToken(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
            message:"User created successfully"
        });
    }else{
        res.status(400).json({message:"Invalid user data"});
    }


   } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({message:"Server Error"});
    
   }

}