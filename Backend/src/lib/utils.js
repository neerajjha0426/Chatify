import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expires in 7 days
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? false : true, // Set to true in production
        sameSite: 'strict', // CSRF attack protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return token;
};