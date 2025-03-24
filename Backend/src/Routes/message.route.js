import express from 'express'
import { authCheck  } from "../Middlewares/AuthCheck.js";
import { getAllUsers ,getallMessages,CreateMessages, SearchUser } from '../Controller/msgController.js';
import upload from "../Config/multer.js";
import { SearchValidator } from '../Middlewares/Validator.js';
const router = express.Router();



router.get('/allusers', authCheck , getAllUsers)

router.post("/sendmessage" , authCheck , upload.single('image') , CreateMessages)

router.get("/:id" , authCheck , getallMessages)

router.post('/searchUser', authCheck , SearchValidator , SearchUser)
export default router