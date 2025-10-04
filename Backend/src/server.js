//Express Import
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './route/auth.route.js';
import messageRoutes from './route/message.route.js';
import path from 'path';
import { connect } from 'http2';
import { connectDB } from './lib/db.js';

//express app and dotenv config
const app = express();
app.use(express.json());

dotenv.config();
//Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
 //middleware to parse json data
//for deployment
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    // Use a regex route to serve React's index.html for any path (avoids path-to-regexp parsing of '*')
    app.get(/.*/, (_, res) => {
        res.sendFile(path.join(__dirname, "../Frontend","dist","index.html"));
    });
}


// console.log('Server is starting...'+process.env.PORT);
const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
    console.log('Server is running on port : ' + PORT  );
    connectDB();
});