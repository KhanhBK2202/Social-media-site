const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const ArticleSchema = new Schema({
    // _id: { type: Number },
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    tags: [{ type: String, required: true }],
    slug: { type: String, slug: 'title', unique: true },
    content: { type: String, default: 'Write your content here' },
    usersLike: [{ 
        type: Schema.Types.ObjectId,
        ref: 'User' 
    }],
    likes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
    // comments: [{ 
    //     content: String, 
    //     likes: Number,
    //     author: { 
    //         type: Schema.Types.ObjectId, 
    //         ref: 'User' 
    //     } 
    // }, {timestamps: true}],
}, { 
    // _id: false,
    timestamps: true
})

// ArticleSchema.index({title: 'text'});
// Add plugins
mongoose.plugin(slug)
ArticleSchema.plugin(AutoIncrement, {inc_field: 'articleId', collection_name: 'articleCounter'})

module.exports = mongoose.model('Article', ArticleSchema)