const router = require('express').Router()
const User = require('../models/User.js')
const Post = require('../models/Post.js')



//CREATE POST
router.post('/', async (req, res)=> {
    const newPost = new Post(req.body)
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user){
            return res.status(400).json('User does not exist')
        }
        try {
            const savedPost = await newPost.save()
            res.status(200).json(savedPost)
        } catch (error) {
            res.status(500).json(error)
        }
    } catch (error) {
        console.log(error)
    }
    })

//UPDATE POST
router.put('/:id', async (req, res)=> {
    
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username)
        {
            try {
                const updatedPost =  await Post.findByIdAndUpdate(
                    req.params.id,
                    {
                    $set: req.body,
                }, 
                {new:true}
                )
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        }else {
            res.status(400).json('Not authorised')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE POST
router.delete('/:id', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username)
        {
            try {
                await Post.findByIdAndDelete(req.params.id)
                res.status(200).json('Post deleted')
            } catch (error) {
                res.status(500).json(error)
            }
        }else {
            res.status(400).json('Not authorised')
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET POST 
router.get('/:id', async (req, res)=> {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET ALL POSTS

router.get('/', async (req, res)=> {
    const username = req.query.user
    const category = req.query.cat
    try {
        let posts;
        if(username){
            posts = await Post.find({username: username})
        }else if(category){
            posts = await Post.find({categories: {
                $in:[category]
            }})
        }else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router