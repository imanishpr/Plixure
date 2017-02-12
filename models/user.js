/**
 * Created by manish on 11/2/17.
 */
var dbconfig = require('../models/dbconfig');
var passwordHash = require('password-hash');
module.exports = {
    getUser:function (req, res, err) {
        var userId=req.params.id;
        var decision = (userId==-1)? 1 : "p_id="+ userId;
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            var query = "select * from ?? where " + decision;
            var table = ["parcer" , userId];
            console.log(query);
            query = dbconfig.msql.format(query, table);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": err});
                } else {
                    res.json({"status": "Success", "data":{"modules":{ "module": rows }}});
                }
            })
        } else {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    },
    addUser: function (req, res, err) {
        var userfname = req.body.fname;
        var email_id = req.body.email;
        var userlname = req.body.lname;
        var passcode = passwordHash.generate(req.body.passcode);
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon') {
            var query = "insert into ?? (p_name, p_last_name, p_email_id,p_password,welcome_date) values(?,?,?,?,NOW())";
            var table = ["parcer" , userfname ,userlname, email_id, passcode];
            console.log(query);
            query = dbconfig.msql.format(query, table);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": err});
                } else {
                    res.json({"status": "Success", "data":{"modules":{ "module": rows }}});
                }
            })
        }
        else
        {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    }
}