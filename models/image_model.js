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
            if((typeof albumId === 'undefined' || albumId === '')){
                var query = "select pa_id from  ??  where parcer_id = ? and pa_status = ?";
                var table = ["parcer_album" , userId , 18];
                query = dbconfig.msql.format(query, table);
                console.log(query);
                dbconfig.connection.query(query, function (err, rows) {
                    if (err) {
                        res.json({"status": "failure", "data": err});
                        return;
                    } else {
                        albumId = rows[0].pa_id;
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
                                return;
                            } else {
                                res.json({"status": "Success", "data":rows });
                                return;
                            }
                             
                        })
                    });
                }
                     
            })
            }else{
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
                        return;
                    } else {
                        res.json({"status": "Success", "data":rows });
                        return;
                    }
                     
                })
            });
            }
        }
    },
    getImage: function(req, res, err){
        var user_id=req.params.id;
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon') {
            var query = "select * from ?? inner join ?? on uploaded_module_photo.userid=userinfo.userid where userinfo.userid=?";
            var table = ["uploaded_module_photo","userinfo",user_id];

            query = dbconfig.msql.format(query, table);
            console.log(query);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": "Error executing MySQL query"});
                } else {
                    res.json({"status": "Success", "data": {"projectlist": rows}});
                }
            })
        }
        else
        {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    }
    getAlbum: function(req, res, err){
        
    },
    makeImagePrivate: function(req, res, err){

    }
}