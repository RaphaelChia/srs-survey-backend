const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port=process.env.PORT || 3000;

app.use(cors())
app.use(express.json())
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("Mongo successful db connection.")
})
app.get("/",(req,res)=>{
    res.send("Hello world "+uri)
})

const surveyStudentRouter = require('./routes/surveyStudentsRoute')
const surveyTeacherRouter = require('./routes/surveyTeachersRoute')
app.use('/surveyStudents',surveyStudentRouter)
app.use('/surveyTeachers',surveyTeacherRouter)
app.disable('x-powered-by')
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
