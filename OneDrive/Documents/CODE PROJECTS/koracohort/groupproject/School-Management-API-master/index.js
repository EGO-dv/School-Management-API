const lecturerRouter = require("./routes/lecturerRouter")
const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
require("./database")
const app = express()
const PORT = 5050

app.use(express.json())




app.use("/lecturers", lecturerRouter)
app.listen(PORT,()=>{console.log(`My Application is running on port ${PORT}`)})