const Article = require('../models/Article')

class ArticleController {
    // [PUT] /article/incLikes/:articleId
    async incLikes(req, res, next) {
        const updatedInfo = await Article.findOneAndUpdate({ _id: req.params.articleId }, {$inc : {'likes' : 1}}, {
            new : true,
            runValidators : true
        }).populate('likes')
        try {
            res.status(200).json({
                status: 'Success',
                data: {
                    updatedInfo
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    // [PUT] /article/decLikes/:articleId
    async decLikes(req, res, next) {
        const updatedInfo = await Article.findOneAndUpdate({ _id: req.params.articleId }, {$inc : {'likes' : -1}}, {
            new : true,
            runValidators : true
        }).populate('likes')
        try {
            res.status(200).json({
                status: 'Success',
                data: {
                    updatedInfo
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    // [PUT] /article/saved/usersLike/:articleId
    async usersLike(req, res, next) {
        const updatedInfo = await Article.findOneAndUpdate({ _id: req.params.articleId }, { $set: req.body }, {
            new : true,
            runValidators : true
        }).populate('usersLike')
        try {
            res.status(200).json({
                status: 'Success',
                data: {
                    updatedInfo
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    // [DELETE] /article/unsaved/usersLike/:userId/:articleId
    async unsaveUser(req, res, next) {
        const updatedInfo = await Article.updateOne({ _id: req.params.articleId }, {
            $pullAll: {
                usersLike: [req.params.userId],
            },
        }).populate('usersLike')
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

    // [PUT] /article/views/:articleId
    async views(req, res, next) {
        const updatedInfo = await Article.findOneAndUpdate({ _id: req.params.articleId }, {$inc : {'views' : 1}}, {
            new : true,
            runValidators : true
        })
        try {
            res.status(200).json({
                status: 'Success',
                data: {
                    updatedInfo
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    // [DELETE] /article/delete/:tagName
    async deleteTag(req, res, next) {
        const updatedInfo = await Article.updateMany({ tags: req.params.tagName }, {
            $pullAll: {
                tags: [req.params.tagName],
            },
        })
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

module.exports = new ArticleController();
