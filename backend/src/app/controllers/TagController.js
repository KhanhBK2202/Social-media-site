const Tag = require('../models/Tag')

class TagController {
    
    // [GET] /tag/show/
    async show(req, res, next) {
        const tags = await Tag.find({})
        try {
            res.json({
                data : {
                    tags,
                }
            })
        }
        catch(err){
            res.json({
                status: 'Failed',
                message : err
            })
        }
    }

    // [POST] /tag/create
    create(req, res, next) {
        const tag = new Tag(req.body)
        tag 
            .save()
            .then(() => res.send('successfully'))
            .catch(next)
    }

    // DELETE /tag/:tagName
    async deleteTag(req, res, next) {
        const updatedInfo = await Tag.findOneAndRemove({ name: req.params.tagName })
        try {
            res.status(204).json({
                status: 'Success',
                data: {
                    updatedInfo
                }
            })
        } catch(err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    } 
}

module.exports = new TagController();
