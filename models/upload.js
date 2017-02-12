/**
 * Created by manish on 12/2/17.
 */
var cloudinary = require('../helpers/cloudinary').cloudinary;
var dbconfig = require('../models/dbconfig');
module.exports = {

    imageUpload: function (req, res, err) {
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            if(req.files.myImage.path){
                cloudinary.uploader.upload(req.files.myImage.path,function(result) {
                    console.log(result);
                    var userId  =   req.body.userId;
                    var imgDesc =   req.body.imgDesc;
                    var albumId =   req.body.albumId;
                    var imgUrl  =   result.url;
                    var imgSUrl =   result.secure_url;
                    var imgPId  =   result.public_id;
                    var cDate   =   result.created_at;
                    var query = "insert into ??  values(?,?,?,?,?,?,?,?)";
                    var table = ["parcer_images" , "" , albumId, "", imgDesc ,cDate, 1, imgUrl, imgSUrl];
                    query = dbconfig.msql.format(query, table);
                    console.log(query);
                    dbconfig.connection.query(query, function (err, rows) {
                        if (err) {
                            res.json({"status": "failure", "data": err});
                        } else {
                            res.json({"status": "Success", "data":"Congo You did it !!"});
                        }
                    })
                });
            }
        } else {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    }
}