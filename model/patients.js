const mongoose =  require('mongoose')


const patientsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: True,
        default: Date.now
    },
    department: {
        type: String,
        required: True
    },
    doctor: {
        type: String,
        required: True
    }
})

module.exports = mongoose.model('Patients', patientsSchema)