//Express Import
import express from 'express';
const app = express();

//Dotenv Import
import dotenv from 'dotenv';
dotenv.config();

//Route Import for auth
import authRoutes from './route/auth.route.js';
app.use('/api/auth', authRoutes);

import messageRoutes from './route/message.route.js';
app.use('/api/messages', messageRoutes);


// console.log('Server is starting...'+process.env.PORT);
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT  );
});