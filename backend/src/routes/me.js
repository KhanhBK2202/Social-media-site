const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/MeController');

router.get('/stored/articles', meController.show);
router.get('/group/article', meController.groupPost);
router.post('/create/articles', meController.create);
router.put('/saved/:userId', meController.save);
router.delete('/unsaved/:userId/:articleId', meController.unsave);
// router.get('/saved/:userId/articles', meController.savedArticles);
router.get('/written/:userId/:articleId', meController.writtenDetail)
router.get('/written/:userId', meController.written)
router.get('/article/:articleId', meController.showArticle);
router.get('/posts/:tagName', meController.showArticleByTag);
router.delete('/article/delete/:articleId', meController.deleteArticle);
router.put('/update/article/:articleId', meController.updateArticle);
router.put('/comment/update/:commentId', meController.updateComment);
router.post('/comment/:articleId', meController.comment);
router.get('/showComment/:articleId', meController.showComment);
router.get('/showAllComment', meController.showAllComment);
router.delete('/comment/delete/:commentId', meController.deleteComment);
router.get('/search/:searchArticle', meController.search);
router.get('/articles/trending', meController.trend);
router.delete('/unbookmarked/:userId/:articleId', meController.unbookmark);
router.put('/article/:articleId/comment', meController.addComment);
router.delete('/article/:articleId/comment/delete/:commentId', meController.deleteCommentArticle);
router.delete('/allComments/delete/:articleId', meController.deleteAllComments);


module.exports = router;
