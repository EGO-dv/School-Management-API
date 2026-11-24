const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
require("./database")
const app = express()
const PORT = 5050
const studentRoutes = require("./routes/studentRouter")
app.use(express.json())
app.use(studentRoutes)


const courseRegRouter = require("./routes/courseRegRouter");

app.use("/registrations", courseRegRouter);


app.listen(PORT,()=>{console.log(`My Application is running on port ${PORT}`)})