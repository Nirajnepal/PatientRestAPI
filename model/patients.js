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
    date_of_birth: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Patient', patientsSchema)