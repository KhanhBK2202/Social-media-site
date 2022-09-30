const Article = require('../models/Article')
const User = require('../models/User')
const Comment = require('../models/Comment')

class MeController {
    // [GET] /me/stored/articles
    async show(req, res, next) {
        const articles = await Article.find({}).sort({ createdAt: -1 }).populate('author')
        const articlesDashboard = await Article.find({}).populate('author')
        var author = []
        articles.forEach((article, index) => {
            author.push(article.author)
        })
        try {
            res.json({
                data : {
                    articles, 
                    articlesDashboard,
                    author
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

    // [POST] /me/create/articles
    create(req, res, next) {
        const article = new Article(req.body)
        article
            .save()
            .then((data) => res.send(data))
            .catch(next)
    }

    // [GET] /me/saved/:userId/articles
    // async savedArticles(req, res, next) {
    //     const articles = await User.findOne({ _id: req.params.userId })
    //     try {
    //         res.json({
    //             data : {
    //                 articles
    //             }
    //         })
    //     }
    //     catch(err){
    //         res.json({
    //             status: 'Failed',
    //             message : err
    //         })
    //     }
    // }

    // [PUT] /me/saved/:userId
    async save(req, res, next) {
        const updatedInfo = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: req.body }, {
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

    // [DELETE] /me/unsaved/:userId/:articleId
    async unsave(req, res, next) {
        const updatedInfo = await User.updateOne({ _id: req.params.userId }, {
            $pullAll: {
                articlesLike: [req.params.articleId],
            },
        }).populate('articlesLike')
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

    // [GET] /me/written/:userId
    async written(req, res, next) {
        const articles = await Article.find({ author: req.params.userId }).sort({ createdAt: -1 })
        try {
            res.json({
                data : {
                    articles
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

    // [GET] /me/written/:userId/:articleId
    async writtenDetail(req, res, next) {
        const articles = await Article.find({ author: req.params.userId, _id: {$ne: req.params.articleId}})
        try {
            res.json({
                data : {
                    articles
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

    // [GET] /me/article/:articleId
    async showArticle(req, res, next) {
        const articles = await Article.findOne({ _id: req.params.articleId }).populate('author')
        const author = articles.author
        try {
            res.json({
                data : {
                    articles,
                    author
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

    // [GET] /me/posts/:tagName
    async showArticleByTag(req, res, next) {
        const articles = await Article.find({ tags: req.params.tagName }).populate('author')
        try {
            res.json({
                data : {
                    articles,
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

    // [DELETE] /me/article/delete/:articleId
    async deleteArticle(req, res, next) {
        const updatedInfo = await Article.findByIdAndRemove({ _id: req.params.articleId })
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

    // [PUT] /me/update/article/:articleId
    async updateArticle(req, res, next) {
        const updatedInfo = await Article.findOneAndUpdate({ _id: req.params.articleId }, { $set: req.body }, {
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

    // [POST] /me/comment/:articleId
    comment(req, res, next) {
        const comment = new Comment(req.body)
        comment
            .save()
            .then((data) => res.send(data))
            .catch(next)
    }

    // [GET] /me/showComment/:articleId
    async showComment(req, res, next) {
        const comment = await Comment.find({ article: req.params.articleId }).populate('author')
        try {
            res.json({
                data : {
                    comment
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

    // [PUT] /me/comment/update/:commentId
    async updateComment(req, res, next) {
        const updatedInfo = await Comment.findOneAndUpdate({ _id: req.params.commentId }, { $set: req.body }, {
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

    // [DELETE] /me/comment/delete/:commentId
    async deleteComment(req, res, next) {
        const updatedInfo = await Comment.findByIdAndRemove({ _id: req.params.commentId })
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

    // [GET] /me/search/:searchArticle
    async search(req, res, next) {
        const articles = await Article.find( { title: { $regex: '.*' + req.params.searchArticle + '.*', $options: 'i'} } ).populate('author')
        // var author = []
        // articles.forEach((article, index) => {
        //     author.push(article.author)
        // })
        try {
            res.json({
                data : {
                    articles
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

    // [GET] /me/articles/trending
    async trend(req, res, next) {
        const articles = await Article.find({}).sort({likes: -1}).limit(5).populate('author')
        // var author = []
        // articles.forEach((article, index) => {
        //     author.push(article.author)
        // })
        try {
            res.json({
                data : {
                    articles
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

    // [DELETE] /me/unbookmarked/:userId/:articleId
    async unbookmark(req, res, next) {
        const updatedInfo = await User.updateOne({ _id: req.params.userId }, {
            $pullAll: {
                bookmark: [req.params.articleId],
            },
        }).populate('bookmark')
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

    // [PUT] /me/article/:articleId/comment
    async addComment(req, res, next) {
        const updatedInfo = await Article.findOneAndUpdate({ _id: req.params.articleId }, { $push: req.body }, {
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

    // [DELETE] /me/article/:articleId/comment/delete/:commentId
    async deleteCommentArticle(req, res, next) {
        const updatedInfo = await Article.updateOne({ _id: req.params.articleId }, {
            $pullAll: {
                comments: [req.params.commentId],
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

    // [DELETE] /me/allComments/delete/:articleId
    async deleteAllComments(req, res, next) {
        const updatedInfo = await Comment.deleteMany({ article: req.params.articleId })
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

    // [GET] /me/group/article
    async groupPost(req, res, next) {
        const posts = await Article.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%m/%d/%Y", date: '$createdAt' } },
                count: { $sum: 1 }
            }
        }])
        // .sort({createdAt: -1});
        try {
            res.json({
                data : {
                    posts
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

    // [GET] /me/showAllComment
    async showAllComment(req, res, next) {
        const comment = await Comment.find({}).sort({createdAt: -1}).populate('author').populate('article')
        try {
            res.json({
                data : {
                    comment
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
}

module.exports = new MeController();
