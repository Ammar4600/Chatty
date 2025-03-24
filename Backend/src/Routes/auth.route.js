import express from "express"
import { loginController, logoutController,updateAbout, picupdateController, refreshgetUser, signupController, AddusertoMycontact } from "../Controller/authController.js";
import { Loginvalidator, validator } from "../Middlewares/Validator.js"
import { authCheck } from "../Middlewares/AuthCheck.js";
import upload from "../Config/multer.js";

const router = express.Router();




router.post("/signup", validator, signupController)

router.post("/login", Loginvalidator, loginController)

router.post("/logout",logoutController)

router.post("/update-profile-pic", authCheck , upload.single('profilePic'), picupdateController )

router.post("/update-about", authCheck , updateAbout)

router.get("/check" , authCheck , refreshgetUser)

router.post('/addContact', authCheck , AddusertoMycontact)





export default router;