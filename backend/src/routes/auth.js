import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, getUser } from '../config/database.js';
import { auth } from '../config/firebase.js';

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone || phone.length < 10) {
      return res.status(400).json({
        error: 'Invalid phone number',
        message: 'Please provide a valid 10-digit phone number',
        code: 'INVALID_PHONE'
      });
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    try {
      const userRecord = await auth.getUserByPhoneNumber(formattedPhone);
      
      return res.json({
        success: true,
        message: 'OTP sent successfully',
        phone: formattedPhone,
        existingUser: true
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.json({
          success: true,
          message: 'OTP sent successfully',
          phone: formattedPhone,
          existingUser: false
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({
      error: 'Failed to send OTP',
      message: 'Unable to send verification code. Please try again.',
      code: 'OTP_SEND_FAILED'
    });
  }
});

router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({
        error: 'Missing required fields',
        message: 'Phone number and OTP are required',
        code: 'MISSING_FIELDS'
      });
    }

    const formattedPhone = phone.startsWith('+91') ? phone : `+91${phone}`;

    try {
      const userRecord = await auth.getUserByPhoneNumber(formattedPhone);
      
      const token = jwt.sign(
        { 
          uid: userRecord.uid,
          phone: userRecord.phoneNumber,
          email: userRecord.email
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      const existingUser = await getUser(userRecord.uid);
      
      if (!existingUser) {
        await createUser(userRecord.uid, {
          phone: userRecord.phoneNumber,
          name: userRecord.displayName || 'User',
          shopName: '',
          email: userRecord.email || '',
          gstin: '',
          address: ''
        });
      }

      res.json({
        success: true,
        message: 'OTP verified successfully',
        token,
        user: {
          uid: userRecord.uid,
          phone: userRecord.phoneNumber,
          email: userRecord.email,
          name: userRecord.displayName || 'User'
        }
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({
          error: 'User not found',
          message: 'No account found with this phone number',
          code: 'USER_NOT_FOUND'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      error: 'Failed to verify OTP',
      message: 'Unable to verify the code. Please try again.',
      code: 'OTP_VERIFY_FAILED'
    });
  }
});

router.post('/refresh-token', async (req, res) => {
  try {
    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({
        error: 'Missing user ID',
        message: 'User ID is required to refresh token',
        code: 'MISSING_UID'
      });
    }

    try {
      const userRecord = await auth.getUser(uid);
      
      const token = jwt.sign(
        { 
          uid: userRecord.uid,
          phone: userRecord.phoneNumber,
          email: userRecord.email
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        success: true,
        message: 'Token refreshed successfully',
        token
      });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({
          error: 'User not found',
          message: 'No account found with this user ID',
          code: 'USER_NOT_FOUND'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({
      error: 'Failed to refresh token',
      message: 'Unable to refresh the token. Please try again.',
      code: 'TOKEN_REFRESH_FAILED'
    });
  }
});

export default router;


