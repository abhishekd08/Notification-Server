var getUserId = function(mail, pass, callback) {
    var mysql = require('mysql');
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "sqlabhi08",
        database: "NotificationApp"
    });
    con.connect(function(err){ 
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

    var sqlQuery = "select token from users where mail=? and pass=?;";
    con.query(sqlQuery, [mail, pass], function(err, rows) {
        if(err){
            console.log(err);
            var result = {
                "from":"getUserId",
                "result":"fail",
                "reason":"database error"
            }
            callback(JSON.stringify(result));
        }else{
            console.log("getUserId rows.length : "+rows.length);
            console.log("getUserId rows : "+rows[0].token);
            if(rows[0].token != null){
                var result = {
                    "from":"getUserId",
                    "result":"success",
                    "token":rows[0].token
                };
                callback(JSON.stringify(result));
            }else{
                var result = {
                    "from":"getUserId",
                    "result":"fail",
                    "reason":"0 rows"
                };
                callback(JSON.stringify(result));
            }
        }
    });
    con.end();
}

module.exports = getUserId;