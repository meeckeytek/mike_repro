import { User } from "../Models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SECRET_KEY = "SECRET";




// Sign Up Function Start //

export const Signup = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
  
    //checking user is already exits//
  
    const exitsUser = await User.findOne({ email: email });
    if (exitsUser) {
      return res.status(400).json({ message: "user is already exists" });
    }
  
    // genetare hashed password//
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // craete user //
  
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
     
  
    });
  
    // generating token logic //
  
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY);
  
    res.status(200).json({
      success: true,
      user,
      token,
    });
  };
  
  // Sign Up Function End //
  
  
  
  
  
    
   // Sign In Function Start //
  
  export const SignIn = async(req, res, next)=>{
  
    const {email,password} = req.body;
    
    // checking if user is not exist//
    
    const existUser = await User.findOne({email:email,});
    
    if(!existUser){
        return res.status(404).json({message:"user not found"});
  
    }
  
    // compare hashedPassword//
  
    const matchePassword = await bcrypt.compare(password,existUser.password);
  
     if(!matchePassword){
  
      return res.status(404).json({message:"invalid credentails"});
     }   
  
  // genetaring token//
  
   const token = jwt.sign({email:existUser.email, id:existUser._id},SECRET_KEY);
  
   res.status(200).json({
    success: true,
    existUser,
    token,
  });
  
  
  }


  // Get all User //

  export const getUsers = async(req,res)=>{
   try {
    const user = await User.find();
    res.json({
     user,
    });
    
} catch (error) {
    res.status(404).json({ message: 'User not found', error });
}
 
  }


  // Update User // 

  export const updateUser = async(req,res)=>{
    const { firstName, lastName, email, password } = req.body;
    const {userId} = req.params;
try {
    const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.findByIdAndUpdate(userId, {

    firstName, 
    lastName, 
    email, 
    password:hashedPassword, 
},
{ new: true }
);


res.status(200).json({
    user,
    message: "succsessfully updated",
  });
    
} catch (error) {
   
    res.status(403).json({ message: 'something went wrong', error });
}
    

  }


  // Delete User // 

  export const deleteUser = async(req,res)=>{

    const {userId} = req.params;


    try {

        const user = await User.findByIdAndDelete(userId, {
            new:true,
        })
    

        res.status(200).json({
            user,
            message: "succsessfully deleted",
          });

} catch (error) {
    res.status(403).json({ message: 'something went wrong', error });
}


  }