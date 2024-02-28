import express from 'express';
import checkUserAuth from '../middlewares/authMiddlewares';
const { signUp, signIn , changeUserPassword, loggedUser, sendUserPasswordResetEmail, userPasswordReset} = require('../controller/userController')

const router = express.Router()

// public routes
router.post('/register', signUp )
router.post('/login', signIn )
router.post('/send-reset-password-email',sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token',userPasswordReset)
// protected routes

router.post('/changepassword',checkUserAuth,changeUserPassword)
router.get('/loggedUser',checkUserAuth, loggedUser)
module.exports = router

