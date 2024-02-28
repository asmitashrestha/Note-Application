const { findUserEmail, findUserById } = require('../repository/userRepository')
// import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')


exports.generateToken = async(email:any)=>{
  const existingUser = await findUserEmail(email)
  const token = jwt.sign({userId: existingUser.id},
     process.env.JWT_SECRET_KEY,{ expiresIn :'1d'})
     return token
}

exports.generateNewToken = async(id:any)=>{
  const existingUserId = await findUserById(id)
  const token = jwt.sign({userId: existingUserId.id},
    process.env.JWT_SECRET_KEY, {
      expiresIn:'30m'
    })
    return token
}