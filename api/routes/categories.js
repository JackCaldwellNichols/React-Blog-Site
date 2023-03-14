const router = require('express').Router()
const Category = require('../models/Category.js')


//CREATE CATEGORY

router.post('/', async (req, res)=> {
    const newCat = new Category(req.body)

    try {
        const savedCategory = await newCat.save()
        res.status(200).json(savedCategory)
    } catch (error) {
        res.status(500).json(error)
    }
})


//GET CATEGORIES

router.get('/', async (req, res)=> {
    
    try {
        const cats = await Category.find()
        res.status(200).json(cats)
    } catch (error) {
        res.status(500).json(error)
    }
})




module.exports = router