const express = require('express')
const router =  express.Router()
const Patient = require('../model/patients')

//Getting All Patients
router.get('/', async (req, res) => {
    try{
        
    } catch {

    }
})
//Getting One Patient
router.get('/:id', (req,res) => {

})

//Adding Patient
router.post('/', (req,res) => {

})

//Updating Patient
router.patch('/:id', (req, res) => {

})

module.exports = router