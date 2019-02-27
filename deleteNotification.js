var deleteNotification = function(title, body, datetime, callback) {

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
                "from":"deleteNotification",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        }; 
    });

    var sqlQuery = "DELETE FROM notifications WHERE title=? and body=? and datetime=?;";
    con.query(sqlQuery, [title, body,datetime], function(err) {
        if(err){
            console.log("Error in delete notification");
            console.log(err);
            var res = {
                "from":"deleteNotification",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        }else{
            var res = {
                "from":"deleteNotification",
                "result":"success",
            };
            callback(JSON.stringify(res));
        }
    });
}

module.exports = deleteNotification;