/**
 * Created by manish on 12/2/17.
 */
var express = require('express');
var Images = require('../../models/image_model');
var router = express.Router();
router.post('/upload', Images.imageUpload);
router.get('/getimage/:id', Images.getImage);
router.get('/getalbumbyuserid/:id', Images.getAlbumbyUserId);
router.post('/createalbum', Images.createAlbum);
router.post('/makeImagePrivate', Images.makeImagePrivate);
module.exports = router;