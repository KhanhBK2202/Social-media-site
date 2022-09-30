const express = require('express');
const router = express.Router();

const tagController = require('../app/controllers/TagController');

router.get('/show', tagController.show);
router.post('/create', tagController.create);
router.delete('/:tagName', tagController.deleteTag);

module.exports = router;