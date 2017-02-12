/**
 * Created by manish on 11/2/17.
 */
var express = require('express');
var userRout = require('../../models/user');
var router = express.Router();

/* GET home page. */
router.get('/user/:id', userRout.getUser);
router.post('/adduser', userRout.addUser);
//router.get('/v1/module', moduleRoute.getModule);
module.exports = router;
