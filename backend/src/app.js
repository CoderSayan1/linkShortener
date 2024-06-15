import express from 'express';
import shortUrl from '../src/routes/shortUrl.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.route.js'


const app = express();

// middleware
app.use(express.json()) 
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))
app.use(cookieParser())


app.use('/api', shortUrl)
app.use('/api/v1/users', userRouter)


export { app }