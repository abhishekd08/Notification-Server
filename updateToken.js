var updateToken = function(mail, pass, token, callback) {
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
                "from":"updateToken",
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
            var result = {
                "from":"updateToken",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(result));
        }else{
            if(rows && rows.length) {
                if(rows[0].pass == pass){
                    var sqlQuery2 = "UPDATE users SET token=? WHERE mail=? and pass=?;";
                    con.query(sqlQuery2, [token,mail,pass], function(err) {
                        if(err){
                            console.log(err);
                            var result = {
                                "from":"updateToken",
                                "result":"fail",
                                "reason":"database error"
                            };
                            callback(JSON.stringify(result));
                        }else{
                            var result = {
                                "from":"updateToken",
                                "result":"success"
                            };
                            callback(JSON.stringify(result));
                        }
                    });
                }else{
                    var result = {
                        "from":"updateToken",
                        "result":"fail",
                        "reason":"wrong password"
                    };
                    callback(JSON.stringify(result));
                }

            }else{
                var result = {
                    "from":"updateToken",
                    "result":"fail",
                    "reason":"user not registered"
                };
                callback(JSON.stringify(result));
            }
        }
    });
}

module.exports = updateToken;