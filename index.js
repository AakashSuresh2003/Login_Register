const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const PORT = process.env.PORT

app.use("/",(req,res)=>{
    res.status(200).json({Message:"Home Page"})
})

app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`);
})