const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: String, 
    likes: Number,
    author: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    article: { 
        type: Schema.Types.ObjectId, 
        ref: 'Article'
    },
    // parentId: {type: Number, default: 0}
}, { 
    timestamps: true
})

// Add plugins
mongoose.plugin(slug)
CommentSchema.plugin(AutoIncrement, {inc_field: 'commentId', collection_name: 'commentCounter'})

module.exports = mongoose.model('Comment', CommentSchema)