const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UserController');

router.get('/showAll', userController.showAll);
router.get('/group', userController.groupUser);
router.get('/search/:searchUser', userController.search);
router.get('/top/followers', userController.topFollowers);
router.get('/:userId', userController.show);
router.post('/create', userController.create);
router.put('/update/:userId', userController.update);
router.delete('/deleteSkill/:userId/:skill', userController.deleteSkill);
router.delete('/deleteCompany/:userId/:company', userController.deleteCompany);
router.delete('/deleteSchool/:userId/:school', userController.deleteSchool);
// router.delete('/deleteHobby/:userId/:hobby', userController.deleteHobby);
router.put('/:userId/article', userController.addArticle);
router.put('/:id1/follow/:id2', userController.follow);
router.delete('/:id1/unfollow/:id2', userController.unfollow);
router.delete('/:id1/unfollowed/:id2', userController.unfollowed);
router.delete('/delete/:userId', userController.deleteUser);
router.delete('/:userId/article/delete/:articleId', userController.deleteArticle);

module.exports = router;
