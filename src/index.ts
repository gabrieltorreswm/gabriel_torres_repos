import express , { Request, Response, Router } from 'express'
import cors from 'cors'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from "./../config/orm";

connectDB

const app = express()
const port = process.env.port || process.env.PORT;

app.use(cors())
app.use(express.json())

import Routes from './routes/index'

// endPoint api 
app.use('/v1', Routes)

app.listen(port, () =>{
    console.log(` App running on the port ${port}`)
})