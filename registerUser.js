var registerUser = function(mail, pass, token, callback){

    var closeDatabaseCon = false;

    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sqlabhi08",
        database: "NotificationApp"
    });
    con.connect(function(err) {
        if(err){
            console.log(err);
            var res = {
                "from":"registerUser",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        };
    });

    var sqlQuery = "SELECT pass FROM users WHERE mail=?;";
    con.query(sqlQuery, [mail], function(err, rows) {
        if(err){
            console.log(err);
            var res = {
                "from":"registerUser",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        }else{
            if(rows && rows.length){
                var res = {
                    "from":"registerUser",
                    "result":"fail",
                    "reason":"user already registered"
                };
                callback(JSON.stringify(res));
                con.end();
            }else{
                closeDatabaseCon = false;
                var sqlQuery2 = "INSERT INTO users (token, mail, pass) values (?,?,?);";
                con.query(sqlQuery2, [token,mail,pass], function(err) {
                    if(err){
                        console.log(err);
                        var res = {
                            "from":"registerUser",
                            "result":"fail",
                            "reason":"database error"
                        };
                        callback(JSON.stringify(res));
                    }else{
                        var res = {
                            "from":"registerUser",
                            "result":"success"
                        }
                        callback(JSON.stringify(res));
                    }
                });
                con.end();
            }
        }
    });
}
module.exports = registerUser;