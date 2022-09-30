const User = require('../models/User')
class UserController {
    // [POST] /user/create
    create(req, res, next) {
        const user = new User(req.body)
        user 
            .save()
            .then(() => res.send('successfully'))
            .catch(next)
    }
        // var userData = {
        //     usename: req.body.username,
        //     email: req.body.email,
        //     password: req.body.password,
        //     slug: req.body.slug,
        // }
        // new User(userData)
        // .save()
        // .then(() => res.send('Created successfully'))
        // .catch(next)
        
    // [GET] /user/:userId
    async show(req, res, next) {
        const profile = await User.findOne({ _id: req.params.userId }).populate('articlesLike').populate('bookmark')
        // const articles = profile.articlesLike
        const bookmark = profile.bookmark
        try {
            res.json({
                data : {
                    profile,
                    // articles, 
                    bookmark
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

    // [PUT] /user/update/:userId
    async update(req, res, next) {
        const updatedInfo = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, {
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

    // DELETE /user/deleteSkill/:userId/:skill
    async deleteSkill(req, res, next) {
        const updatedSkill = await User.updateOne({ _id: req.params.userId }, {
            $pullAll: {
                skills: [req.params.skill],
            },
        })
        try {
            res.status(204).json({
                status: 'Success',
                data: {
                    updatedSkill
                }
            })
        } catch(err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }

    // DELETE /user/deleteCompany/:userId/:company
    async deleteCompany(req, res, next) {
        const updatedCompany = await User.updateOne({ _id: req.params.userId }, {
            $pullAll: {
                work: [req.params.company],
            },
        })
        try {
            res.status(204).json({
                status: 'Success',
                data: {
                    updatedCompany
                }
            })
        } catch(err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }

    // DELETE /user/deleteSchool/:userId/:school
    async deleteSchool(req, res, next) {
        const updatedSchool = await User.updateOne({ _id: req.params.userId }, {
            $pullAll: {
                education: [req.params.school],
            },
        })
        try {
            res.status(204).json({
                status: 'Success',
                data: {
                    updatedSchool
                }
            })
        } catch(err) {
            res.status(500).json({
                status: 'Failed',
                message: err
            })
        }
    }

    // // DELETE /user/deleteHobby/:userId/:hobby
    // async deleteHobby(req, res, next) {
    //     const updatedHobby = await User.updateOne({ _id: req.params.userId }, {
    //         $pullAll: {
    //             hobbies: [req.params.hobby],
    //         },
    //     })
    //     try {
    //         res.status(204).json({
    //             status: 'Success',
    //             data: {
    //                 updatedHobby
    //             }
    //         })
    //     } catch(err) {
    //         res.status(500).json({
    //             status: 'Failed',
    //             message: err
    //         })
    //     }
    // }

    // [PUT] /user/:id1/follow/:id2
    async follow(req, res, next) {
        const updatedInfo = await User.findOneAndUpdate({ _id: req.params.id1 }, { $push: req.body }, {
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

    // DELETE /user/:id1/unfollow/:id2
    async unfollow(req, res, next) {
        const updatedInfo = await User.updateOne({ _id: req.params.id1 }, {
            $pullAll: {
                following: [req.params.id2],
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

    // DELETE /user/:id1/unfollowed/:id2
    async unfollowed(req, res, next) {
        const updatedInfo = await User.updateOne({ _id: req.params.id2 }, {
            $pullAll: {
                followers: [req.params.id1],
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

    // [GET] /user/search/:searchUser
    async search(req, res, next) {
        const users = await User.find( { username: { $regex: '.*' + req.params.searchUser + '.*', $options: 'i'} } )
        try {
            res.json({
                data : {
                    users
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

    // [GET] /user/top/followers
    async topFollowers(req, res, next) {
        const users = await User.find({ }).sort({followers: -1}).limit(3)
        try {
            res.json({
                data : {
                    users
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

    // [GET] /user/showAll
    async showAll(req, res, next) {
        // console.log('abc')
        const profile = await User.find({}).sort({createdAt: -1})
        const profileDashboard = await User.find({})
        try {
            res.json({
                data : {
                    profile,
                    profileDashboard
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

    // DELETE /user/delete/:userId
    async deleteUser(req, res, next) {
        const updatedInfo = await User.findByIdAndRemove({ _id: req.params.userId })
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

    // [GET] /user/group
    async groupUser(req, res, next) {
        const users = await User.aggregate([
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
                    users
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

    // [PUT] /user/:userId/article
    async addArticle(req, res, next) {
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

    // DELETE /user/:userId/article/delete/:articleId
    async deleteArticle(req, res, next) {
        const updatedInfo = await User.updateOne({ _id: req.params.userId }, {
            $pullAll: {
                articles: [req.params.articleId],
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

module.exports = new UserController();
