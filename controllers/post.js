const Post = require('../models/post')


// const postView = async (req, res) => {
//     try {
//         console.log('show: ', req.params.listingId)
//         const posting = await Listing.findById(req.params.listingId).populate('owner')
        
//         const userHasFavorited = listing.favoritedByUsers.some((user) => user.equals(req.session.user._id))
        
//         res.render('./posts/view.ejs', {
//             title: posting.body,
//             posting,
//             userHasFavorited
//         })

//     } catch (error) {
//         console.log(error)
//         res.redirect('/')
//     }

// }
const postAdd = async (req, res) => {
    req.body.owner = req.session.user._id
    console.log(req.body.owner)
    const newPost = await Post.create(req.body)
    console.log('hi')
    console.log(newPost)
    res.redirect('/posts/view.ejs')

    // try {
    //     req.body.owner = req.session.user._id
    //     console.log(req.body.owner)
    //     const newPost = await Post.create(req.body)
    //     console.log('hi')
    //     console.log(newPost)
    //     res.redirect('/')
    // } catch (error) {
    // res.redirect('/')
    // }
}


const posting = (req, res) => {
    res.render('./posts/new.ejs', {
        title: 'DevsBranch: Add Post'
    })
}
const main = (req, res) => {
    res.render('../views/index.ejs', {
        title: 'DevsBranch: Main'
    })
}

const homePage = (req, res) => {
    res.render('/views/home.ejs', {
        title: 'DevsBranch: Homepage'
    }

    )
}


// const postList = async (req, res) => {
//         res.render('./posts/view.ejs', {
//             title:'text'
//         })}

const postList = async (req, res) => {
    const postings = await Post.find()
    console.log(postings)

    res.render('./posts/view.ejs', {
        title: 'DevsBranch: Add Post',
        postings
    })
}
    // try {
    // const postings = await Post.find({});
    // console.log(postings)

    // res.render('posts/view.ejs', {
    //     postings
    // })
    // } catch (error) {
    // console.log(error)
    // res.redirect('/')
    // }
   

module.exports = {
    postAdd,
    posting,
    main,
    homePage,
    postList,
}