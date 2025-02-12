// require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')

const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const isSignedIn = require('./middleware/is-signed-in')
const passUserToView = require('./middleware/pass-user-to-view')

const port = process.env.PORT ? process.env.PORT : '3000'

//Creates a connection to MONGO database
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})

// MIDDLEWARE
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        ttl: 7 * 24 * 60 * 60 // 1 week in seconds
    }),
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
        httpOnly: true,
        secure: false,
    }
}))
app.use(passUserToView)

//CONTROLLERS
const pagesCtrl = require('./controllers/pages')
const authCtrl = require('./controllers/auth')
const postCtrl = require('./controllers/post')
const commentCtrl = require('./controllers/comment')


//ROUTE HANDLERS
app.get('/', pagesCtrl.home)
app.get('/auth/sign-up', authCtrl.signUp)
app.post('/auth/sign-up', authCtrl.addUser)
app.get('/auth/sign-in', authCtrl.signInForm)
app.post('/auth/sign-in', authCtrl.signIn)
app.get('/auth/sign-out', authCtrl.signOut)
app.get('/views/home', postCtrl.homepage)
app.get('/posts/aboutHakim', postCtrl.abouthakim)
app.get('/posts/about', postCtrl.about)
app.get('/posts/faq', postCtrl.faq)

// PRIVATE - must be signed in
app.get('/posts/new', postCtrl.posting)
app.post('/posts', postCtrl.postAdd)
app.get('/posts/view', postCtrl.postList)
app.get('/posts/:postingId', postCtrl.detail)
app.use(isSignedIn)
app.get('/posts/:userId/:postingId/edit', postCtrl.editPost)
app.post('/posts/:userId/:postingId/edit', postCtrl.editPost)
app.put('/posts/:userId/:postingId', postCtrl.updatePost)
app.post('/posts/:postingId/comments', commentCtrl.commentAdd)
app.delete('/posts/:userId/:postingId/comments/:commentId', commentCtrl.commentDelete)
app.delete('/posts/:userId/:postingId', postCtrl.deletePost)





app.listen(port, () => {
    console.log(`The express app is ready on port ${port}`)
})