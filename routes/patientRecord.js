const express = require('express')
const router =  express.Router()
const Patient = require('../model/patients')
const PatientRecord = require('../model/patientRecord')


// Get Single Patient Records
router.get('/patients/:id/records', getPatientRecord, async(req, res) => {
    res.json(res.patientRecord)
})

// Get All Patient Records
router.get('/records', async(req,res) => {
    try {
      const patientRecords = await PatientRecord.find()
      res.json(patientRecords)
    } catch (err) {
      res.status(500).json({ message: err.message }) 
    }
})

// Add Patient Record
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
        res.status(400).send({ message: err.message })
    }
})

//Updating Patient Record
router.patch('/patients/:id/records', getPatientRecord, async(req, res) => {
    if (req.body.date != null) {
      res.patientRecord.date = req.body.date
    }
    if (req.body.nurse_name != null) {
      res.patientRecord.first_name= req.body.nurse_name
    }
    if (req.body.blood_oxygen_level != null) {
      res.patientRecord.blood_oxygen_level= req.body.blood_oxygen_level
    }
    if (req.body.heartbeat_rate != null) {
      res.patientRecord.heartbeat_rate= req.body.heartbeat_rate
    }
    if (req.body.blood_pressure != null) {
      res.patientRecord.blood_pressure= req.body.blood_pressure
    }
    if (req.body.height != null) {
      res.patientRecord.height= req.body.height
    }
    if (req.body.weight!= null) {
      res.patientRecord.weight= req.body.weight
    }
  try {
      const updatedPatientRecord = await res.patientRecord.save()
      res.json(updatedPatientRecord)
  } catch (err) {
      res.status(400).json({ message: err.message })
  }
})

//Deleting Patient
router.delete('/patients/:id/records', getPatientRecord, async(req, res) => {
  try {
      await res.patientRecord.remove()
      res.json({ message: 'Patient Record Deleted' })
  } catch (err) {
      res.status(500).json({ message: err.message })
  }
})

//Critical Patient List 
router.get('/records/critical', async(req, res) => {
  try {
    const patientRecords = await PatientRecord.find({
      $or: [
        { blood_oxygen_level: { $lt:92 }},
        { heartbeat_rate: { $lt:60 }},
        { blood_pressure: { $lt:90/60}}
      ]
    });
    res.json(patientRecords)
  } catch (err) {
    res.status(500).json({ message: err.message }) 
  }
})

// Function to find the patientRecord by user_id 
async function getPatientRecord(req, res, next) {
    let patientRecord
    try {
      patientRecord = await PatientRecord.findOne({user_id: `${req.params.id}`})
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