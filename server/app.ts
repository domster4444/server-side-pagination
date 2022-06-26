import { Request, Response } from 'express';
//? config app
const express = require('express');
const app = express();

//?config dotenv file
const dotenv = require('dotenv');
dotenv.config({ path: './configs/config.env' });

//?config cors
const cors = require('cors');
const allowedOrigin =
  process.env.NODE_ENV === 'development' ? '*' : process.env.PROD_CLIENT_URL;
app.use(
  cors({
    origin: allowedOrigin,
    methods: 'GET,PUT,PATCH,POST,DELETE',
  })
);
//?connect to db
const connectDB = require('./configs/database');
//connect to db
const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

//?config cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//?config body-parser
app.use(express.json({ limit: '50mb' })); //? allow body parsing to be up to 50mb
app.use(express.urlencoded({ extended: true, limit: '50mb' })); //? allow body parsing to be up to 50mb

//?config morgan
const morgan = require('morgan');
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//todo: routes imports
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoute');
app.use('/api/v1', testRoutes);
app.use('/api/v1', authRoutes);
app.use('/api/v1/task', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'server working fine',
  });
});

//?config globalErrorMiddleware
const globalErrorMiddleware = require('./middlewares/globalErrorMiddleware');
app.use(globalErrorMiddleware);

module.exports = app;
