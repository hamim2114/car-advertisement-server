import express from 'express';
import {
  changePassword,
  forgotPassword,
  getLoggedUser,
  handleLogin,
  handleReg,
  resendVerifyEmail,
  resetPassword,
  updateLoggedUser,
  verifyEmail,
} from '../controller/user.controller.js';
import { verifyToken } from '../middleware/verify.token.js';

export const userRoute = express.Router();

userRoute.post('/register', handleReg);

userRoute.post('/login', handleLogin);

userRoute.post('/verify-email', verifyEmail);

userRoute.post('/resend-verify-email', resendVerifyEmail);

userRoute.get('/me', verifyToken, getLoggedUser);

userRoute.put('/user/update', verifyToken, updateLoggedUser);

userRoute.put('/change-password', verifyToken, changePassword);

userRoute.post('/forgot-password', forgotPassword); //for submit email

userRoute.post('/reset-password', resetPassword); //for submit new password
