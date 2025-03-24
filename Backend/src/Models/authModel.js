import  mongoose  from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        minlength:3,
        maxlength:50,
        trim:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false,
    },
    profilePic: {
        type: String,
        default: "",
      },
      about: {
        type: String,
        maxlength: 100,
      },
      contact: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      status: {
        type: String,
        default: 'Offline',
      },

},
{ timestamps: true },
)

userSchema.pre('save' ,async function (next) {
  if(!this.isModified('password'))
    return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

userSchema.methods.generateAuthToken = async function () {
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, { expiresIn: '7d'});
    return token;
}

const UserModel = mongoose.model('User', userSchema);
export default UserModel;