const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req,res)=>{
    console.log("register user function")
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("No Field should be empty")
    }


    if(password.length < 6){
        return res.status(400).json({
            message:'Password should be greater than or equal to 8 characters long'
        })
    }


    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400)
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    } else{
        res.status(400);
        throw new Error("Failed to create the user")
    }

})

const loginUser = asyncHandler(async(req,res)=>{
    const {email, password} = req.body;

    if(!email || !password){
        throw new Error("Email and password required")
    }

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        
        req.session.user = user;
        
        return res.status(200).json({
            user
        });
    } else {
        res.status(400);
        throw new Error("Invalid Email or Password");
    }
})


const isauthUser = asyncHandler(async (req,res)=>{
    if(req.session.user){
        return res.json(req.session.user)
    }
    return res.status(401).json("Unauthorised")
})


const logoutUser = async(req,res)=>{
    if(req.session.user){
        delete req.session.user;
    }
    return res.status(200).json("User logged out")
}


module.exports = {registerUser, loginUser, isauthUser, logoutUser};