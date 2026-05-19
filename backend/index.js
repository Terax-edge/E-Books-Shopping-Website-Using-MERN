const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/index')



const app = express()
app.use(cors({
    origin : process.env.FRONT_URL,
    credentials : true
}))



app.use(express.json({ limit: '10mb' })); // increase JSON limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // for form-data
app.use(cookieParser())
app.use("/api",router)

const PORT = process.env.PORT

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Connect to DB")
    console.log(`🚀 Server running at http://localhost:${PORT}`)
})

})