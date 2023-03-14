const router = require('express').Router()
const User = require('../models/User.js')
const Posts = require('../models/Post.js')
const bcrypt = require('bcrypt')


//UPDATE
router.put('/:id', async (req, res)=> {
     if(req.body.userId === req.params.id){
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 12)
        }
         try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body 
        }, {new: true})
        const {password, ...others} = updatedUser._doc
        res.status(200).json(others)
        }catch (error) {
        res.status(500).json({success: false, message: error})

        }
    }else {
        res.status(401).json('Not authorised.')
    }
})


//DELETE
router.delete('/:id', async (req, res)=> {
    if(req.body.userId === req.params.id){
        try {
            const user = await User.findById(req.params.id);
                try {
                        await Posts.deleteMany({username:user.username})
                        await User.findByIdAndDelete(req.params.id)
                        res.status(200).json('User deleted')
                }catch (error) {
                        res.status(500).json({success: false, message: error})
                }
        }catch (error) {
            res.status(400).json("User not found")
        }
    }else {
       res.status(401).json('Not authorised.')
    }
})

//GET USER 
router.get('/:id', async (req, res)=> {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router