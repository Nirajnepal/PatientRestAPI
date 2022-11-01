const express =  require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/patients", {
    useNewUrlParser: true
})

app.use(express.json())

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

const patientsRouter =  require('./routes/patients')
app.use('/api', patientsRouter)

app.listen(8080, ()=>{
    console.log('Server has started')
})