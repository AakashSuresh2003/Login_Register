const dotenv = require("dotenv").config()
const express = require("express")
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT

app.use("/",(req,res)=>{
    res.status(200).json({Message:"Home Page"})
})

app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})