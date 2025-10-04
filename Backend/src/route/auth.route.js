import express from 'express';
import User from '../models/User.js';
import { signup } from '../controller/auth.controller.js';

const router = express.Router();

router.post('/signup',signup);

router.get('/login', (req, res) => {
    res.send('Hello  Login!');
});

router.get('/logout', (req, res) => {
    res.send('Logout Page!');
});

export default router;