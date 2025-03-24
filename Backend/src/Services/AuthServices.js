import UserModel from "../Models/authModel.js"

const createUser = async ({fullname , email , password}) => {
  try {
    const newUser = await new UserModel({
        fullname,
        email,
        password,
    })
    const token= await newUser.generateAuthToken()
     await newUser.save()
    
     return {user:newUser , token}
  }
  catch (error) {
    
    console.error(error)
    throw new Error('Server Error')

  }
}


export {createUser}