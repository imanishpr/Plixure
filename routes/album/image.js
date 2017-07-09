/**
 * Created by manish on 12/2/17.
 */
var express = require('express');
var upload = require('../../models/image_model');
var router = express.Router();
router.post('/upload', Images.imageUpload);
router.get('/getImage:id', Images.getImage);
router.get('/getAlbum:id', Images.getAlbum);
router.post('/makeImagePrivate', Images.makeImagePrivate);
module.exports = router;