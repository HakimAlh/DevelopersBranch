const Post = require('../models/post')

const postAdd = async (req, res) => {
    req.body.owner = req.session.user._id
    // console.log(req.body.owner)
    const newPost = await Post.create(req.body)
    // console.log(newPost)
    res.redirect('./posts/view')

}

const posting = (req, res) => {
    res.render('./posts/new.ejs', {
        title: 'DevsBranch: Add Post'
    })
}

const postList = async (req, res) => {
    const postings = await Post.find().populate('owner')

    res.render('./posts/view.ejs', {
        title: 'DevsBranch: Add Post',
        postings
    })
}

const detail = async (req, res) => {
    try {
        console.log('Detail: ', req.params.postingId)
        const posting = await Post.findById(req.params.postingId).populate('owner')
        // console.log('Hi!')
        // console.log(posting)

        
        res.render('./posts/detailedview.ejs', {
            title: 'DevsBranch: Post',
            posting,
            comments:posting.comments
        })
        

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }

}

const abouthakim = (req, res) => {
    res.render('../views/aboutHakim.ejs', {
        title: 'DevsBranch: About Hakim'
    })
}

const homepage = async (req, res) => {
    const postings = await Post.find({}).populate('owner')
    res.render('../views/home.ejs', {
        title: 'DevsBranch: Main',
        postings
    })
}

const about = (req, res) => {
    res.render('./views/about.ejs', {
        title: 'DevsBranch: About'
    })
}

const faq = (req, res) => {
    res.render('/views/faq.ejs', {
        title: 'DevsBranch: FAQ'
    })
}

const deletePost = async (req, res) => {
    try {
        const posting = await Post.findById(req.params.postingId)
        console.log(posting)
        if (posting.owner.equals(req.params.userId)) {
            await posting.deleteOne()
            res.redirect('/posts/view')
        } else {
            res.send("You don't have permission to do that.")
        }
        

    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}


const editPost = async (req, res) => {
    try {
        const posting = await Post.findById(req.params.postingId).populate('owner')
         if(posting.owner.equals(req.params.userId)) {

         
        res.render('./posts/edit.ejs', {
            title: 'Edit Post',
            posting
        })
     } else {
        res.send("You don't have permission to do that.")
     }
    } catch {
        console.log(error)
        res.redirect('/')
    }
}

const updatePost = async (req, res) => {
    try {
        const posting = await Post.findByIdAndUpdate(
        req.params.postingId,
        req.body,
        { new: true}
        )
        res.redirect(`/posts/${posting._id}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}

module.exports = {
    postAdd,
    posting,
    // main,
    homepage,
    postList,
    detail,
    abouthakim,
    about,
    faq,
    deletePost,
    editPost,
    updatePost
}