const Post = require('../models/post')

//index -- shows all posts in 
const postList = async (req, res) => {
    const postings = await Post.find().populate('owner')

    res.render('./posts/view.ejs', {
        title: 'DevsBranch: Add Post',
        postings
    })
}

//render new.ejs page
const posting = (req, res) => {
    res.render('./posts/new.ejs', {
        title: 'DevsBranch: Add Post'
    })
}

//create a new post
const postAdd = async (req, res) => {
    req.body.owner = req.session.user._id
    // console.log(req.body.owner)
    const newPost = await Post.create(req.body)
    // console.log(newPost)
    res.redirect('posts/view')
}

//about hakim render
const abouthakim = (req, res) => {
    res.render('../views/aboutHakim.ejs', {
        title: 'DevsBranch: About Hakim'
    })
}

//homepage render
const homepage = async (req, res) => {
    const postings = await Post.find({}).populate('owner')
    res.render('../views/home.ejs', {
        title: 'DevsBranch: Main',
        postings
    })
}

//about render
const about = (req, res) => {
    res.render('./views/about.ejs', {
        title: 'DevsBranch: About'
    })
}

//faq render
const faq = (req, res) => {
    res.render('/views/faq.ejs', {
        title: 'DevsBranch: FAQ'
    })
}

module.exports = {
    postList,
    postAdd,
    abouthakim,
    homepage,
    about,
    faq,
    posting
}