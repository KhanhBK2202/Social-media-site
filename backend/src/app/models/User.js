const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const UserSchema = new Schema({
    // _id: { type: Number },
    username: { type: String, unique: true, required: [true, 'Username is required'] },
    email: { type: String, required: [true, 'Email is required']},
    password: { type: String, minLength: [6, 'Password must be at least 6 characters'], required: [true, 'Password is required'] },
    slug: { type: String, slug: 'username', unique: true },
    job: String,
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    articles: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    articlesLike: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: 'Article'
    }],
    isAdmin: { type: Boolean, default: false },
    phone: String,
    address: String,
    dob: String,
    skills: [{ type: String }],
    work: [{ type: String }],
    education: [{ type: String }],
    bio: String,
    avatar: { type: String, default: 'https://res.cloudinary.com/des13gsgi/image/upload/v1658686670/avatar/a3yvp0a1gabjqwawgga8.webp' },
    cover: { type: String, default: 'https://res.cloudinary.com/des13gsgi/image/upload/v1658851383/cover/2560x1440-gray-x11-gui-gray-solid-color-background_xj5jy0.jpg' },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String }
}, { 
    // _id: false,
    timestamps: true
})

// Add plugins
mongoose.plugin(slug)
UserSchema.plugin(AutoIncrement, {inc_field: 'userId', collection_name: 'userCounter'})

module.exports = mongoose.model('User', UserSchema)