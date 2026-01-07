import jwt from 'jsonwebtoken';
import { auth } from '../config/firebase.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Access token required',
        code: 'NO_TOKEN'
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (jwtError) {
      return res.status(403).json({ 
        error: 'Invalid or expired token',
        code: 'INVALID_TOKEN'
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      error: 'Authentication error',
      code: 'AUTH_ERROR'
    });
  }
};

export const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'Firebase token required',
        code: 'NO_FIREBASE_TOKEN'
      });
    }

    try {
      const decodedToken = await auth.verifyIdToken(token);
      req.user = {
        uid: decodedToken.uid,
        phone: decodedToken.phone_number,
        email: decodedToken.email
      };
      next();
    } catch (firebaseError) {
      return res.status(403).json({ 
        error: 'Invalid Firebase token',
        code: 'INVALID_FIREBASE_TOKEN'
      });
    }
  } catch (error) {
    return res.status(500).json({ 
      error: 'Firebase authentication error',
      code: 'FIREBASE_AUTH_ERROR'
    });
  }
};
