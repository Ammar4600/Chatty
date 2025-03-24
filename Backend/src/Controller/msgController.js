import { validationResult } from "express-validator";
import cloudinary from "../Config/cloudinary.js";
import UserModel from "../Models/authModel.js";
import MessageModel from '../Models/messageModel.js'




export const getAllUsers = async (req , res) => {
    try {
        const  id = req.user._id;
   const user = await UserModel.findById(id);
   const arryofId = user.contact.concat(id).filter(item => item.toString() !== id.toString()); 
   const users = await UserModel.find({ _id: { $in: arryofId } });
    res.json(users);
   
     
    } catch (error) {

        console.error('Error while getting all users' + error)
        res.status(500).json({error: "Server Error"})  }
        
    }



export const CreateMessages = async (req , res) => {
    try {
        const {message , reciverID} = req.body;
        const senderID = req.user._id;
        if(req.file){
       const image = req.file;
       const result =  await cloudinary.uploader.upload(image.path , function (err) {
            if (err) return res.status(400).json({ message: 'error while uploading to cloudinary', error: err.message });           
        })
        const newMessage = new MessageModel({
            sender: senderID,
            receiver: reciverID,
            text: message,
            image: result.secure_url,
        })
        await newMessage.save();
       

              res.json([newMessage])
    }else{
        const newMessage = new MessageModel({
            sender: senderID,
            receiver: reciverID,
            text: message,
        })
        await newMessage.save();
        
         res.json([newMessage])
    }

      

    } catch (error) {
        console.error('Error while sending message' + error)
        res.status(500).json({error: "Server Error"})  }
    }


export const getallMessages = async (req , res) => {

    try {
        const myID = req.user._id;
        const otherID = req.params.id;
      const allmessages =  await MessageModel.find(
          {
            $or: [
                { sender: myID, receiver: otherID },
                { sender: otherID, receiver: myID },
            ]
          }
        )
        const otherUser = await UserModel.findById(otherID);
        const myself = await UserModel.findById(myID);
        if (allmessages.length === 0) {
            return res.json(['no message' , otherUser]);
        }
        res.json([ allmessages, otherUser , myself]);

    } catch (error) {
        console.error('Error while getting messages' + error)
        res.status(500).json({error: "Server Error"})  }
        
    }

    export const SearchUser = async (req , res) => {
        // const error = validationResult(req);
        // if(!error.isEmpty()) return res.status(400).json('validation error');
        try {
            const {email} = req.body;
            console.log(email)
            const user = await UserModel.findOne({email}).select('-password');
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user)
        } catch (error) {
            console.error('Error while searching user' + error)
        }
     
        
    }