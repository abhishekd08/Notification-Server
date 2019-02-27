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
                "from":"getUserId",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        }; 
    });

    var sqlQuery = "SELECT id,pass from users WHERE mail=?;";
    con.query(sqlQuery, [mail], function(err, rows) {
        
    });
}

module.exports = getUserId;