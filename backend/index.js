const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/index')

const app = express()
app.use(cors({
    origin : `http://localhost:3000`,
    credentials : true
}))


app.use(express.json({ limit: '10mb' })); // increase JSON limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // for form-data
app.use(cookieParser())
app.use("/api",router)

const PORT = 8080 || process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connect to DB")
    console.log("Sever is running")
})

})