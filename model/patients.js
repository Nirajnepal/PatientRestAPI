const mongoose =  require('mongoose')


const patientsSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First Name is required"]
    },
    last_name: {
        type: String,
        required: [true, "Last Name is required"]
    },
    address: {
        type: String,
        required:[true, "Address is required"]
    },
    date_of_birth: {
        type: String,
        required: [true, "Date of Birth is required"],
    },
    department: {
        type: String,
        required: [true, "Department Name is required"]
    },
    doctor: {
        type: String,
        required: [true, "Doctor Name is required"]
    }
})

module.exports = mongoose.model('Patient', patientsSchema)