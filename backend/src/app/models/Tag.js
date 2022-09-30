const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const AutoIncrement = require('mongoose-sequence')(mongoose)

const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: { type: String, unique: true }
})

// Add plugins
mongoose.plugin(slug)
TagSchema.plugin(AutoIncrement, {inc_field: 'tagId', collection_name: 'tagCounter'})

module.exports = mongoose.model('Tag', TagSchema)