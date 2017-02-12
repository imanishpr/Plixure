/**
 * Created by manish on 23/12/16.
 */
var dbconfig = require('../models/dbconfig');
module.exports = {
    getModule: function (req, res, err) {
        var p=req.params.id;
        var arr= [];
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            var query = "select * from ?? where  mod_photoid=?";
            var table = ["module_photo",req.params.id];
            query = dbconfig.msql.format(query, table);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                   res.json({"status": "failure", "data": "Error executing MySQL query"});
                } else
                {
                    var query = " select a.paramid, a.param_name, a.param_desc from ?? as a inner join ?? AS b on a.paramid=b.param1id OR a.paramid=b.param2id OR a.paramid=b.param3id where  b.modid=?";
                    var table = ["judgement_params","mod_judgement_param",p];
                    query = dbconfig.msql.format(query, table);
                    dbconfig.connection.query(query, function (err, rows1) {
                        if (err) {
                          res.json({"status": "failure", "data": "Error executing MySQL query1"});
                        } else
                        {
                            arr.push({module:rows});
                            arr.push({parameters:rows1});
                            res.json({"status": "Success", "data": arr });
                        }

                    })


                }
            })
        }else
        {

            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    },
    projectListing: function (req, res, err) {
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
}
var p=function(currentItem) {
/*    var mod_photoid="";
    _.forEach(currentItem, function(value, key) {
        console.log(key +':' + value);
        mod_photoid =value;
        console.log(mod_photoid);
    });*/
    return _.zipObject(["mod_photoid", "paramid"],currentItem);
}