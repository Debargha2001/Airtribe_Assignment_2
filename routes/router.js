const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const newsController = require('../controllers/newsController');

const router = express.Router();

router.post('/register', authController.signUp);
router.post('/login', authController.login);
router.get('/news', authController.authMiddleware, newsController.fetchNewsbyCategory);
router.get('/news/search/:keyword', authController.authMiddleware, newsController.searchNews);
router.post('/news/:id/read', authController.authMiddleware, newsController.setReadNews);
router.post('/news/:id/favorite', authController.authMiddleware, newsController.setFavoriteNews);
router.get('/news/read', authController.authMiddleware, newsController.fetchReadNews);
router.get('/news/favorites', authController.authMiddleware, newsController.fetchFavoriteNews);
router.get('/preferences', authController.authMiddleware, userController.getPreferences);
router.put('/preferences', authController.authMiddleware, userController.updatePreferences);

module.exports = router;