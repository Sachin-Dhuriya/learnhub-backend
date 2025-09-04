import express from 'express';
const router = express.Router();

import { authenticate, logout } from '../middleware/authMiddleware.js';
import { userRegister, userLogin, userProfile } from '../controller/authController.js';

router.post('/register', userRegister)

router.post('/login', userLogin)

router.get("/profile",authenticate, userProfile)

router.post('/logout',logout)

export default router;