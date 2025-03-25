import { validationResult } from "express-validator"
import UserModel from "../Models/authModel.js"
import { createUser } from "../Services/AuthServices.js";
import bcrypt from "bcryptjs";
import cloudinary from '../Config/cloudinary.js'


const signupController = async (req , res)=>{


    const error = validationResult(req);
    const {fullname, email , password } = req.body;

    if(!error.isEmpty()){ return res.status(400).json({ errors: error.array() })};
    const UserAlreadyExist = await UserModel.findOne({email})? true : false;
    if(UserAlreadyExist) return res.status(400).json("User Already Exist with this email")

    try {

        const {user , token } = await createUser({fullname, email, password})
   res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/"
});


        res.json({ user , token })

    } catch (error) {

        console.error('Error while creating user')
        res.status(500).json({error: "Server Error"})  }
        
    }




const loginController = async (req , res)=>{
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: error.array() });
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({email}).select('+password');
        if(!user) return res.status(400).json({ error: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password , user.password);
        if(!isMatch) return res.status(400).json({ error: "Invalid Credentials" });

        const token = await user.generateAuthToken();
res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/"
});


        res.json({user ,token})
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server Error" })  }
    }

    


const logoutController = async (req , res)=>{
    res.cookie('token', '' , { expires: new Date(0) });
    res.json({ message: "Logged Out Successfully" })  
}



const picupdateController = async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        try {
          const result =   await cloudinary.uploader.upload(req.file.path , function (err ,result) {
                if (err) return res.status(400).json({message: 'error while uploading to cloudinary', error: err.message }); } ) 
                
          const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { profilePic: result.secure_url }, { new: true });
          res.json({ message: "Profile Pic Updated Successfully", updatedUser});


        } catch (error) {
            
            console.error(error)
            res.status(500).json({ error: "Server Error" })  }
        }

     
      
const refreshgetUser = async (req , res)=>{
    try {
        const user = req.user;
        res.json(user)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server Error" })  }
        
    }

 const updateAbout = async (req , res) => {
   try {

    const {about} = req.body;
    const id = req.user._id
    const user = await UserModel.findByIdAndUpdate(id, {
        about: about,
    },{new:true})
    res.json(user)

   } catch (error) {
    
    console.error(error)
    res.status(500).json({ error: "Server Error" })  
    
   }
 }

 const AddusertoMycontact = async (req , res) => {
    const {id} = req.body;
    const {_id} = req.user._id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(_id , {
            $push: {contact :id}
        },{new:true});
        res.json(updatedUser)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Server Error" })  
        
    }
    
 }

export {signupController,AddusertoMycontact ,updateAbout, loginController ,logoutController , picupdateController ,refreshgetUser}
