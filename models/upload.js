/**
 * Created by manish on 12/2/17.
 */
var cloudinary = require('../helpers/cloudinary').cloudinary;
var dbconfig = require('../models/dbconfig');
module.exports = {

    imageUpload: function (req, res, err) {
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            console.log(req.body);
            var userId  =   req.body.userId;
            var imgDesc =   req.body.imgDesc;
            var albumId =   req.body.albumId;
            if((typeof albumId === 'undefined' || req.body.albumId === '')){
                var query = "select pa_id from  ??  where pa_id = ? and status = ?";
                var table = ["parcer_album" , userId , 18];
                query = dbconfig.msql.format(query, table);
                console.log(query);
                dbconfig.connection.query(query, function (err, rows) {
                    if (err) {
                        res.json({"status": "failure", "data": err});
                        return;
                    } else {
                        albumId = rows.pa_id;
                    }
                     
                })
            }
            if(req.files.myImage.path && req.userId ){
                cloudinary.uploader.upload(req.files.myImage.path, function(result) {
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
                            res.json({"status": "Success", "data":rows});
                        }
                         
                    })
                });
            }
        } else {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    }
}