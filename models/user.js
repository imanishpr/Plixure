/**
 * Created by manish on 11/2/17.
 */
var dbconfig = require('../models/dbconfig');
var md5 = require('md5');
module.exports = {
    getUser:function (req, res, err) {
        var userId=req.params.id;
        var decision = (userId==-1)? 1 : "p_id=?";
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            var query = "select * from ?? where " + decision;
            var table = ["parcer" , userId];
            console.log(query);
            query = dbconfig.msql.format(query, table);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": err});
                } else {
                    res.json({"status": "Success", "data":rows });
                }
            })
        } else {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    },

    logInUser:function (req, res, err) {
        var emailId=req.body.id;
        var userpPasswordHash=md5(req.body.passcode);
        console.log("user_id:" + emailId + "passcode" + userpPasswordHash);
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            var query = "select * from ?? where p_email_id= ? and p_password=?";
            var table = ["parcer" , emailId, userpPasswordHash];
            query = dbconfig.msql.format(query, table);
            console.log(query);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": err});
                } else {
                    if(rows.length===0)
                        res.json({"status": "failure", "data":{ rows }});
                    else
                        res.json({"status": "Success", "data":{ rows }});
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
        var passcode = md5(req.body.passcode);
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon') {
            dbconfig.connection.beginTransaction(function(err) {    
                var query = "insert into ?? (p_name, p_last_name, p_email_id,p_password,welcome_date) values(?,?,?,?,NOW())";
                var table = ["parcer" , userfname ,userlname, email_id, passcode];
                console.log(query);
                query = dbconfig.msql.format(query, table);
                dbconfig.connection.query(query, function (err, rows) {
                    if (err) {
                        dbconfig.connection.rollback(function() {
                            res.json({"status": "failure", "data": err});
                            throw err;
                        });
                    } else {
                        var query = "insert into ??  values(?,?,?,?,NOW())";
                        var table = ["parcer_album" , "", rows.insertId,"", 18];
                        query = dbconfig.msql.format(query, table);
                        dbconfig.connection.query(query, function (err, rows) {
                            if (err) {
                                res.json({"status": "failure", "data": err});
                            } else {
                                        dbconfig.connection.commit(function(err) {
                                        if (err) { 
                                          dbconfig.connection.rollback(function() {
                                            res.json({"status": "failure", "data": err});
                                            throw err;
                                          });
                                        }
                                        console.log('Transaction Complete.');
                                      });
                                res.json({"status": "Success", "data": rows });
                            }
                        })
                    }
                })
            });
        }
        else
        {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    },

    changeUserPasscode: function (req, res, err) {
        var oldpasscode = md5(req.body.oldpasscode);
        var newpasscode =md5(req.body.newpasscode);
        var email_id = req.body.email;
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon') {
            var query = "UPDATE ?? SET p_password = ? WHERE p_email_id=? and p_password=?";
            var table = ["parcer" , newpasscode, email_id, oldpasscode];
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