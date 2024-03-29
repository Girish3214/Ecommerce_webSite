import User from "../models/userModel.js"
import generateToken from "../utils/generateTokens.js";
import asyncHandler from "express-async-handler"


//  @desc  Auth user
//  @route POST /api/login
//  @access public 

const authUser = asyncHandler(async(req, res)=> {
    const { email, password } = req.body;

    const user  = await User.findOne({ email })
    if(user && (await user.matchPassword(password)) ){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid email or password")
    }
})


//  @desc  Get user profile
//  @route POST /api/users/profile
//  @access private 

const getUserProfile = asyncHandler(async(req, res)=> {
    const user  = await User.findById(req.user._id)
    if (user) {
        res.json({
            
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin : user.isAdmin,
        })
        
    } else {
        res.status(401);
        throw new Error("User not found")
    }
})

export {authUser, getUserProfile};