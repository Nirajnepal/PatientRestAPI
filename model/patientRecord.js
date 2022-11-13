const mongoose =  require('mongoose')


const patientsRecordSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    date: {
        type: String,
    },
    nurse_name: {
        type: String,
    },
    blood_pressure: {
        type: String,
    },
    blood_oxygen_level: {
        type: String
    },
    heartbeat_rate: {
        type: String
    },
    height: {
        type: String
    },
    weight: {
        type: String
    }
})

module.exports = mongoose.model('PatientRecord', patientsRecordSchema)