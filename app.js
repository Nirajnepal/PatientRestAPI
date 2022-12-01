const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 8080;

mongoose.connect("mongodb+srv://node:node@cluster0.u5jgtoo.mongodb.net/patientsDB?retryWrites=true&w=majority" , {
    useNewUrlParser: true
})

app.use(express.json()) 

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const patientsRouter =  require('./routes/patients')
const patientRecordRouter = require('./routes/patientRecord')
app.use('/api', patientsRouter, patientRecordRouter)

app.listen(port, ()=>{
    console.log('Server has started')
})

module.exports = app