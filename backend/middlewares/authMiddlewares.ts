import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken')
const db = require('../models')
// import db from '../models';

export interface AuthenticatedRequest extends Request {
  user?: any; 
  userId?:number;
}

export const checkUserAuth = async (req: AuthenticatedRequest, res: Response, next: Function) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith('Bearer')) {
    try {
      token = authorization.split(' ')[1];

      // verify token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY) 
      // as { userId: number };
      // console.log('User id:',userId);
     req.userId = userId

      // GET USER FROM TOKEN
      req.user = await db.User.findByPk(userId, {
        attributes: { exclude: ['password', 'password_confirmation'] },
      });
      
      // console.log(req.user);
      
      // console.log(userId);
      next();
    } catch (error) {
      console.error(error);

      res.status(401).json({
        error: 'Unauthorized User',
      });
    }
  } else {
    res.status(401).json({
      error: 'Unauthorized User, No Token',
    });
  }
};

export default checkUserAuth;
