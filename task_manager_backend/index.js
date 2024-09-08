require('dotenv').config();
const cors = require('cors');
const express = require('express');
const functions = require('firebase-functions');
const app = express();
const { userLoginRoute } = require('./server/routes/auth/login');
const { userSignupRoute } = require('./server/routes/auth/signup');
const { userTaskRoute } = require('./server/routes/task/task_route');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

const { connection } = require('./server/config/db');

//routes
app.use('/login', userLoginRoute);
app.use('/signup', userSignupRoute);
app.use('/task', userTaskRoute);


// Start the server
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on http://localhost:${process.env.PORT}`);
// });

exports.api = functions.https.onRequest(app); 
