const express = require('express')
const multer = require('multer')
const router = express.Router()
const upload = multer({ dest: 'public/uploads/' })
const {index,uploadImage,ProcessImages,RegisterAction,FindEmailAction} = require('../controller')
router.get('/',index)
router.post('/',upload.single('uploadImage'),uploadImage)
router.post('/result',ProcessImages);
router.post('/register',RegisterAction);
router.post('/listitem',FindEmailAction);
module.exports =router
