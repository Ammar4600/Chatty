import {body} from 'express-validator'


const validator = [
  body('fullname', 'Fullname is required').notEmpty(),
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
]


const Loginvalidator = [
  body('email', 'Please enter a valid email').isEmail(),
  body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
]

const SearchValidator = [
  body('email', 'Please enter a valid email').isEmail(),
]


export {validator , Loginvalidator , SearchValidator}