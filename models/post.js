const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }, 
    body: { 
        type: String,
        required: true,
    },
})
const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    },
    text: { 
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    comments: [commentSchema]
}, {timestamps: true})


const Post = mongoose.model('Post', postSchema)

module.exports = Post