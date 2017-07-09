/**
 * Created by manish on 12/2/17.
 */
var cloudinary = require('../helpers/cloudinary').cloudinary;
var dbconfig = require('../models/dbconfig');
var upload = function (image, userId, albumId, imgDesc){
     if(image){
        console.log('hello');
        cloudinary.uploader.upload(image, function(result) {
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
                    return {"status": "failure", "data": err};
                } else {
                    console.log(JSON.stringify(rows));
                    return {"status": "Success", "data":rows};
                }
                 
            })
        });
    }
    else {
    res.json({"status": "failure", "data": "Wrong Security Code"});
    }
}
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
                        albumId = rows;
                        console.log("myId"+ JSON.stringify(albumId));
                        res.json(upload(req.files.myImage.path, userId, albumId, imgDesc));
                        return;
                    }
                     
                })
            }else{
                res.json(upload(req.files.myImage.path, userId, albumId, imgDesc));
            }
        }
    }
}