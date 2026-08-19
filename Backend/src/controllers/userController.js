import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.json({
        success: true,
        message: "User Registered Successfully",
        user:{
            name: user.name,
            email: user.email
        }
    })
  } catch (error) {
    console.log(error);

    res.json({
        success: false,
        message: error.message
    })
  }
};

export const loginUser = async(req,res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email})

    if(!user){
      return res.json({
        success: false,
        message: "User does not exist"
      })
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    )

    if(!isPasswordCorrect){
      return res.json({
        success: false,
        message: "Invalid Password"
      })
    }

    const token = jwt.sign(
      {id: user._id},
      process.env.JWT_SECRET,
      {expiresIn:"7d"}
    )

    res.json({
      success: true,
      message: "Login successful",
      token,
      user:{
        name: user.name,
        email: user.email
      }
    })
    
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    })
    
  }
}

export const getProfile = async(req,res)=>{
  try {

    const user = await User.findById(req.userId).select("-password")

    if(!user){
      return res.json({
        success: false,
        message: "User not found"
      })
    }

    res.json({
      success: true,
      user
    })
    
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message
    })
    
  }
}