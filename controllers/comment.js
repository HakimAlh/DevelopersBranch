const Post = require('../models/post')

const commentAdd = async (req, res) => {
    req.body.owner = req.session.user._id
    // find the post we are on
    const post = await Post.findById(req.params.postingId)

    await post.comments.push(req.body)

    await post.save()
    console.log(post)
    res.redirect(`/posts/${post._id}`)
}

module.exports = {
    commentAdd
}