/**
 * Created by manish on 12/2/17.
 */
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'parc-india',
    api_key: '854955239716411',
    api_secret: 'DC0DhKwPyP6ZP-GlzqS6MZILgm0'
});
exports.cloudinary = cloudinary;