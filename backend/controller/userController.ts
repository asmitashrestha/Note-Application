const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
import Mailgen from "mailgen";
import sendEmail from "../config/emailConfig";
import { Request, Response } from "express";
const {
  createNewUser,
  findUserEmail,
  findUserById,
} = require("../repository/userRepository");
const { generateToken, generateNewToken } = require("../services/authToken");
import {
  checkUserAuth,
  AuthenticatedRequest,
} from "../middlewares/authMiddlewares"; // Import the AuthenticatedRequest interface
import transporter from "../config/emailConfig";

exports.signUp = async (req: Request, res: Response, next: Response) => {
  const { firstName, lastName, email, password, password_confirmation } =
    req.body;
  const user = await findUserEmail(email);
  if (user) {
    return res.status(400).send({
      error: "User already exists",
    });
  } else {
    if (firstName && lastName && email && password && password_confirmation) {
      if (password === password_confirmation) {
        try {
          const registerUser = await createNewUser(
            firstName,
            lastName,
            email,
            password,
            password_confirmation
          );
          await registerUser.save();
          res.status(200).json({
            msg: "Registration Successfully",
            token: await generateToken(email),
          });
        } catch (error) {
          console.log(error);

          return res.status(500).json({
            error: "Error occured",
          });
        }
      } else {
        return res.status(400).send({
          error: "Password doesn't match",
        });
      }
    } else {
      return res.status(400).send({
        error: "All field are required",
      });
    }
  }
};

exports.signIn = async (req: Request, res: Response, next: Response) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await findUserEmail(email);
      if (user != null) {
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatchPassword) {
          return res.status(200).json({
            msg: "Login Successfully",
            userId:user.id,
            token: await generateToken(email),

          });
        } else {
          return res.status(404).json({
            msg: "Incorrect Password or Email",
          });
        }
      } else {
        res.status(400).json({
          error: "User not registered",
        });
      }
    } else {
      res.status(404).json({
        error: "All Field are required",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "User not found",
    });
  }
};

exports.changeUserPassword = async (req, res, next) => {
  const { password, password_confirmation } = req.body;
  // console.log("Current user id: ",id);
  const userId = req.userId;

  console.log("User details", req.body);

  const user = await db.User.findByPk(userId, {
    attributes: ["id", "password", "password_confirmation"],
  });

  if (!user) {
    console.log("User not found id", userId);

    return res.status(404).json({
      error: "User not found",
    });
  }

  const isSameAsOldPassword = await bcrypt.compare(password, user.password);

  // console.log('current enter password', password);
  // console.log('old hashed password', user.password);

  if (isSameAsOldPassword) {
    return res.status(400).json({
      error: "New password should be different from the old password",
    });
  }

  if (password && password_confirmation) {
    if (password === password_confirmation) {
      const salt = await bcrypt.genSalt(13);
      const newHashPassword = await bcrypt.hash(password, salt);

      await db.User.update(
        { password: newHashPassword },
        { where: { id: user.id } }
      );

      return res.status(200).json({
        msg: "Password changed successfully!",
      });
    } else {
      return res.status(400).json({
        error: "Password and password confirmation do not match",
      });
    }
  } else {
    return res.status(400).json({
      error: "Both password and password confirmation are required",
    });
  }
};

exports.loggedUser = async (req: AuthenticatedRequest, res: Response) => {
  res.status(200).json({
    user: req.user,
  });
};

exports.sendUserPasswordResetEmail = async (
  req: Request,
  res: Response,
  next: Response
) => {
  const { id, email } = req.body;
  if (email) {
    const user = await findUserEmail(email);

    // const secret = user.id + process.env.JWT_SECRET_KEY
    if (user) {
      const token = await generateToken(email);
      // console.log("Token1", token);

      const link = `http://localhost:5173/api/user/reset/${user.id}/${token}`;
      // console.log("Link", link);
      const message = `We have recived a password reset request. Please use the below link to reset your password\n\n${link} \n This password reset link is valid only for 15 minutes`;
      // send email for password reset
      try {
        await sendEmail({
          email: user.email,
          subject: "Password reset request received",
          message: message,
        });

        res.status(200).json({
          msg: "Password reset link send to the user email",
        });
      } catch (error) {
        console.log(error);
        res.status(404).send({
          error:"Something went wrong password reset token not send"
        })
      }

    
    } else {
      res.status(401).json({
        error: "Email doesn't exist",
      });
    }
  } else {
    res.status(401).json({
      error: "Please fill all the field",
    });
  }
};

exports.userPasswordReset = async (
  req: AuthenticatedRequest,
  res: Response,
  next: Response
) => {
  const { email, password, password_confirmation } = req.body;
  const { id, token } = req.params;
  const user = await findUserById(id);

  if (!user) {
    res.status(404).send({
      msg: "User not found",
    });
    return;
  }

  const new_token = generateNewToken(id);
  console.log("New Token", new_token);

  try {
    // Wait for the promise to resolve
    await checkUserAuth;

    if (password && password_confirmation) {
      if (password === password_confirmation) {
        const salt = await bcrypt.genSalt(13);
        const newHashPassword = await bcrypt.hash(password, salt);

        const [rowsUpdated, [updatedUser]] = await db.User.update(
          { password: newHashPassword },
          {
            returning: true,
            where: { id: user.id },
            attributes: { exclude: ["password", "password_confirmation"] }, // Exclude sensitive fields
          }
        );

        if (rowsUpdated > 0) {
          res.send({
            msg: "Password reset successfully",
            // updatedUser: updatedUser,
          });
        } else {
          res.send({
            msg: "Password not updated",
          });
        }
      } else {
        res.send({
          msg: "Password doesn't match",
        });
      }
    } else {
      res.send({
        msg: "All fields are required",
      });
    }
  } catch (error) {
    console.log(error);
    if (error.name === "JsonWebTokenError") {
      res.status(401).send({
        error: "Token Invalid",
      });
    } else {
      res.status(500).send({
        error: "Internal server error",
      });
    }
  }
};
