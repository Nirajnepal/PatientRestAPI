const mongoose =  require('mongoose')


const patientsRecordSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    nurse_name: {
        type: String,
        required: true
    },
    blood_pressure: {
        type: String,
        required: true
    },
    blood_oxygen_level: {
        type: String,
        required: true
    },
    heartbeat_rate: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('PatientRecord', patientsRecordSchema)