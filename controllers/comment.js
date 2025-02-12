const Post = require('../models/post')

const commentAdd = async (req, res) => {
    req.body.owner = req.session.user._id
    // find the post we are on
    const post = await Post.findById(req.params.postingId).populate('owner')

    await post.comments.push(req.body)

    await post.save()
    console.log(post)
    res.redirect(`/posts/${post._id}`)
}

const commentDelete = async (req, res) => {
    try {
        const comment = await Post.findById(req.params.commentId)
        if (comment.owner.equals(req.params.userId)) {
            await comment.deleteOne()
            res.redirect('/posts/detailedview')
        } else {
            res.send("You don't have permission to do that.")
        }
        

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    commentAdd,
    commentDelete,
}