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
        const posting = await Post.findById(req.params.postingId)
        const comment = posting.comments.find(function (comment) {
            return comment._id === req.params.commentId 
          })
        console.log(comment)
        if (posting.owner.equals(req.params.userId)) {
             posting.comments.remove({ _id: req.params.commentId });
             await posting.save();
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