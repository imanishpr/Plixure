var express = require('express');
var homeroute = require('../models/home');
var moduleRoute = require('../models/module');
var router = express.Router();

/* GET home page. */
router.get('/', homeroute.homedata);
//router.get('/cat-list', homeroute.getcat);
//router.get('/v1/module', moduleRoute.getModule);
module.exports = router;
