import express from "express";
import checkUserAuth from "../middlewares/authMiddlewares";
const {
  signUp,
  signIn,
  changeUserPassword,
  loggedUser,
  sendUserPasswordResetEmail,
  userPasswordReset,
} = require("../controller/userController");

const router = express.Router();

// public routes
router.post("/register", signUp);
router.post("/login", signIn);

router.get("/validate-token", checkUserAuth, (req: any, res) => {
  try {
    // Assuming checkUserAuth middleware sets userId in req object
    const userId = req.userId;
    res.status(200).send({ userId });
  } catch (error) {
    console.error("Error occurred while validating token:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

router.post("/send-reset-password-email", sendUserPasswordResetEmail);
router.post("/reset-password/:id/:token", userPasswordReset);
// protected routes

router.post("/changepassword", checkUserAuth, changeUserPassword);
router.get("/loggedUser", checkUserAuth, loggedUser);
module.exports = router;
