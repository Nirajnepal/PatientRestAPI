const express = require('express')
const router =  express.Router()
const Patient = require('../model/patients')
const PatientRecord = require('../model/patientRecord')

router.get('/patients/:id/records', getPatientRecord, async(req, res) => {
    res.json(res.patientRecord)
})

router.post('/patients/:id/records', async(req, res) => {
    const patientRecord = new PatientRecord({
        user_id: req.params.id,
        date: req.body.date,
        nurse_name: req.body.nurse_name,
        blood_pressure: req.body.blood_pressure,
        blood_oxygen_level: req.body.blood_oxygen_level,
        heartbeat_rate: req.body.heartbeat_rate,
        height: req.body.height,
        weight: req.body.weight
    })

    try {
        const newPatientRecord = await patientRecord.save()
        res.status(201).json(newPatientRecord) 
    } catch (err) {
        res.status(400).json({ message: err.message })``
    }
})

// Function to find the patientRecord by user_id 
async function getPatientRecord(req, res, next) {
    let patientRecord
    try {
      patientRecord = await PatientRecord.find({user_id: `${req.params.id}`})
      if (patientRecord == null) {
        return res.status(404).json({ message: 'Cannot find patient record' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.patientRecord = patientRecord
    next()
  }


module.exports = router