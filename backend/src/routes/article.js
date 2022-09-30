const express = require('express');
const router = express.Router();

const articleController = require('../app/controllers/ArticleController');

router.put('/incLikes/:articleId', articleController.incLikes);
router.put('/decLikes/:articleId', articleController.decLikes);
router.put('/saved/usersLike/:articleId', articleController.usersLike);
router.delete('/unsaved/usersLike/:userId/:articleId', articleController.unsaveUser);
router.put('/views/:articleId', articleController.views);
router.delete('/delete/:tagName', articleController.deleteTag);

module.exports = router;