const express =  require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 8080;


mongoose.connect(process.env.DATABASE_URI , {
    useNewUrlParser: true
})

app.use(express.json()) 

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const patientsRouter =  require('./routes/patients')
const patientRecordRouter = require('./routes/patientRecord')
const userRouter = require('./routes/user')
app.use('/api', patientsRouter, patientRecordRouter, userRouter)

app.listen(port, ()=>{
    console.log('Server has started')
})

module.exports = app