const Comment = require('../models/post')

const postAdd = async (req, res) => {
    req.body.owner = req.session.user._id
    const newComment = await Comment.create(req.body)
    console.log(newComment)
    res.redirect('/posts')
}

module.exports = {
    Comment, postAdd
}