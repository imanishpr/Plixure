var dbconfig = require('../models/dbconfig');
module.exports = {
    homedata: function (req, res, err) {
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon'){
            var query = "select * from ??";
            var table = ["parcer"];
            query = dbconfig.msql.format(query, table);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": "Error executing MySQL query"});
                } else {
                    res.json({"status": "Success", "data":{"modules":{ "module": rows }}});
            }
        })
        } else {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    },
    getcat: function (req, res, err) {
        if (req.header('X-FUTZ-SEC') == 'SorryForDelay-GetBackToYouSoon') {
            var query = "SELECT * FROM ??";
            var table = ["category_list"];
            query = dbconfig.msql.format(query, table);
            dbconfig.connection.query(query, function (err, rows) {
                if (err) {
                    res.json({"status": "failure", "data": "Error executing MySQL query"});
                } else {
                    res.json({"status": "Success", "data": {"catlist": rows}});
                }
            })
        }
        else
        {
            res.json({"status": "failure", "data": "Wrong Security Code"});
        }
    }
}