const express = require('express');
const router = express.Router();
const { uploadList, getDistributedLists } = require('../controllers/listController');
const authMiddleware = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

router.post(
  '/upload',
  authMiddleware,
  uploadMiddleware.single('listFile'), 
  uploadList
);

router.get('/distributed', authMiddleware, getDistributedLists);

module.exports = router;