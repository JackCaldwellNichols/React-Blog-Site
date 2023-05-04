const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')

const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const postRoute = require('./routes/posts.js')
const categoryRoute = require('./routes/categories.js')
const multer  = require('multer')


dotenv.config()
app.use(express.json())
app.use('/images', express.static(path.join(__dirname, '/images')))

const port = process.env.PORT

const storage = multer.diskStorage({
    destination:(req, res, cb) => {
        cb(null, 'images')
    }, filename:(req, file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage: storage})

app.post('/api/uploads', upload.single('file'), (req, res)=>{
res.status(200).json('File Uploaded')

})

app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: "GET, POST, PUT, DELETE",
    credentials: true
}))


app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/categories', categoryRoute)
app.use('/api/users', userRoute)


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true
        })
        console.log('Connected')
        app.listen(port, () => {
            console.log('API running')
        })
    } catch (error) {
        console.log(error)
    }
}

startServer()





