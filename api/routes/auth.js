const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')


//REGISTER
router.post('/register', async (req, res)=> {
   
        const checkUser = await User.findOne({username: req.body.username})
        const checkemail = await User.findOne({email: req.body.email})
            if(checkUser){
                res.status(500).json("Username already exists.")
            }else if(checkemail){
                res.status(500).json("Email address alreay in use.")
            }else{   
                try {
                const hashedPassword = await bcrypt.hash(req.body.password, 12)
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password:  hashedPassword
                })

                const user = await newUser.save()
                res.status(201).json(user)
            } catch (error) {
                res.status(500).json({success: false, message: error})
            }}
})


//LOGIN

router.post('/login', async (req, res)=> {
    try {   
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(400).json('Incorrect username or password.')
        }
        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCheck){
            return res.status(400).json('Incorrect username or password')
        }
        const {password, ...others} = user._doc
        res.status(200).json(others)
        }catch (error) {
        res.status(500).json({success: false, message: error})
    }
})

module.exports = router