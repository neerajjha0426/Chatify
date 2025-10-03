import express from 'express';

const router = express.Router();

router.get('/signup', (req, res) => {
    res.send('Signup Page Here!');
});

router.get('/login', (req, res) => {
    res.send('Hello  Login!');
});

router.get('/logout', (req, res) => {
    res.send('Logout Page!');
});

export default router;