const express = require('express')
const router =  express.Router()
const User = require('../model/user')
const {validateUserSignUp, userValidation} = require("../middlewares/validation/user")
const jwt = require('jsonwebtoken');


// Get All Patient Records
router.get('/users', async(req,res) => {
    try {
      const patientRecords = await User.deleteMany()
      res.json(patientRecords)
    } catch (err) {
      res.status(500).json({ message: err.message }) 
    }
})

router.post('/register', validateUserSignUp, async (req,res) => {
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

router.post('/login', validateUserSignUp, async (req,res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user)
    return res.json({
        success: false,
        message: 'User not found, with the given email!',
    });

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch)
    return res.json({
        success: false,
        message: 'email / password does not match!',
    });

    const token = jwt.sign({ userId: user._id }, `process.env.JWT_SECRET`, {
        expiresIn: '1d',
      });
    
      let oldTokens = user.tokens || [];
    
      if (oldTokens.length) {
        oldTokens = oldTokens.filter(t => {
          const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
          if (timeDiff < 86400) {
            return t;
          }
        });
      }

    res.json({success: true, user, token})
})

module.exports = router