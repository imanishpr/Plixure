/**
 * Created by manish on 12/2/17.
 */
var express = require('express');
var upload = require('../../models/upload');
var router = express.Router();
router.post('/upload', upload.imageUpload);
module.exports = router;