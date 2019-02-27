var signIn = function(mail, pass, token, callback){
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
                "from":"signIn",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        };
    });

    var sqlQuery = "SELECT * FROM users where mail=?;"
    con.query(sqlQuery, [mail, pass], function(err, rows) {
        if(err) {
            console.log(err);
            var result = {
                "from":"signIn",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(result));
        }else{
            if(rows && rows.length) {
                if(rows[0].pass == pass){
                    //mail & pass are right 
                    //update token
                    var sqlQuery2 = "UPDATE users SET token=? WHERE mail=? and pass=?";
                    con.query(sqlQuery2, [token, mail, pass], function(err, row) {
                        if(err){
                            console.log(err);
                            var result = {
                                "from":"signIn",
                                "result":"fail",
                                "reason":"token update error"
                            };
                            callback(JSON.stringify(result));
                        }else{
                            var result = {
                                "from":"signIn",
                                "result":"success"
                            };
                            callback(JSON.stringify(result));
                        }
                    });
                    con.end();
                }else{
                    var result = {
                        "from":"signIn",
                        "result":"fail",
                        "reason":"wrong password"
                    };
                    callback(JSON.stringify(result));
                    con.end();
                }
            }else{
                var result = {
                    "from":"signIn",
                    "result":"fail",
                    "reason":"user not registered"
                };
                callback(JSON.stringify(result));
            }
        }
    });
}

module.exports = signIn;