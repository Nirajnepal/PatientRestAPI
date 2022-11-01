const express = require('express')
const router =  express.Router()
const Patient = require('../model/patients')

//Getting All Patients
router.get('/patients', async (req, res) => {
    try{
        const patients = await Patient.find()
        res.json(patients)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
})

//Getting One Patient
router.get('/patients/:id', getPatient, (req,res) => {
    res.json(res.patient)
})

//Adding Patient
router.post('/patients', async (req,res) => {
    const patients = new Patient({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        date_of_birth: req.body.date_of_birth,
        department: req.body.department,
        doctor: req.body.doctor
    })

    try {
        const newPatient = await patients.save()
        res.status(201).json(newPatient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating Patient
router.patch('/:id', (req, res) => {

})

async function getPatient(req, res, next) {
    let patient
    try {
      patient = await Patient.findById(req.params.id)
      if (patient == null) {
        return res.status(404).json({ message: 'Cannot find patient' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.patient = patient
    next()
  }

module.exports = router