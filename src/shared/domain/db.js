const mysql = require("mysql");
const DataBaseError = require("./error/register_error");
const config = require("../infrastructure/persistence/db_config.json");
const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

exports.doQuery = (query, values) => {
    return new Promise((resolve) => {
        connection.query(query, values, (error, results) => {
            if(error) throw new Error(error);
            return resolve(results);
        });
    });
};
