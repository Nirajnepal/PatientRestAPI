const express = require('express')
const router =  express.Router()
const User = require('../model/user')

router.post('/register', async (req,res) => {
    const isNewUser = await User.isThisEmailInUse(req.body.email)
    if(!isNewUser){
        return res.json({success: false, message:"Email alredy in use, try sign-in"})
    }
    const user = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        password: req.body.password,
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = router