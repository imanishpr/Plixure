msql = require('mysql');
exports.connection = msql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.ROOT_USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
exports.msql= msql;
