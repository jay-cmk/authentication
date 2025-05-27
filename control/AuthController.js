const bcrypt = require("bcrypt"); // Fixed require
const jwt=require("jsonwebtoken");
const userModel = require("../models/user"); // Fixed duplicate import and naming

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(409).json({
                message: "User already exists",
                success: false,
            });
        }

        // Create new user
        const newUser = new userModel({ name, email, password });

        // Hash the password before saving
        newUser.password = await bcrypt.hash(password, 10);

        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true,
        });
    } catch (err) { // Fixed typo
        console.error(err); // Optional: log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: "Auth failed",
                success: false,
            });
        }

       const ispassEqual = await bcrypt.compare(password,user.password);
       if(!ispassEqual){
        return res.status(403).json({
            message: "Auth failed",
            success: false,
        });

       }
       const jwtToken= jwt.sign({email:user.email ,_id:user._},
        process.env.JWT_SECRES,
        {expiresIn:'24h'}
       )

       

        res.status(200).json({
            message: "login successful",
            success: true,
        });
    } catch (err) { // Fixed typo
        console.error(err); // Optional: log the error for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false,
            jwtToken,
            email,
            name:user.name
        });
    }
};

module.exports = {
    signup,
    login ,
};
