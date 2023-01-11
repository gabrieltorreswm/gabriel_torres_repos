const express = require('express')
const dotenv = require('dotenv')


dotenv.config()

const app = express()
const port = process.env.PORT;

app.get('/',(req,res) =>{
    res.send("First endpoint")
})

app.listen(port, () =>{
    console.log(` App running on the port ${port}`)
})