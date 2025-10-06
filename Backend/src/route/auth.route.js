import express from 'express';
import User from '../models/User.js';
import { signup ,login ,logout,updateProfile } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection);// Apply Arcjet protection to all routes in this router

router.post('/signup',signup);

router.post('/login',arcjetProtection, login);

router.post('/logout', logout);

router.put('/update-profile', protectRoute, updateProfile);

router.get('/check', protectRoute, (req, res) => res.status(200).json(req.user));


export default router;