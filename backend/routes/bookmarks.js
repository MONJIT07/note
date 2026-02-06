const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');

router.get('/', bookmarkController.getBookmarks);
router.get('/:id', bookmarkController.getBookmarkById);
router.post('/', bookmarkController.createBookmark);
router.put('/:id', bookmarkController.updateBookmark);
router.delete('/:id', bookmarkController.deleteBookmark);

module.exports = router;
