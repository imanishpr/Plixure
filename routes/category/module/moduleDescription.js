/**
 * Created by manish on 23/12/16.
 */
var express = require('express');
var moduleRoute = require('../../../models/module');
var router = express.Router();

/* GET home page. */
router.get('/v1/module/:id', moduleRoute.getModule);
module.exports = router;
