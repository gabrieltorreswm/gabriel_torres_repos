const express = require('express')
const dotenv = require('dotenv')
dotenv.config()

import connectDB from "../config/orm";
import { User } from "./entities/User.entity";



const app = express()
const port = process.env.port || process.env.PORT;


const user = new User()
user.firstName = 'Gabriel'
user.lastName = "Torres"

app.get('/', (req:any,res:any) =>{
    connectDB
    try {
        user.save()
        res.send("User save")
    } catch (error) {
        console.log(error)
        res.send("User not save")
    }
})

app.listen(port, () =>{
    console.log(` App running on the port ${port}`)
})