var getAllNotifications = function(mail, pass, callback){
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
                "from":"getAllNotifications",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
        }; 
    });

    var sqlQuery = "SELECT id from users WHERE mail=? and pass=?;";
    con.query(sqlQuery, [mail,pass], function(err, rows) {
        if(err){
            console.log(err); 
            var res = {
                "from":"getAllNotifications",
                "result":"fail",
                "reason":"database error"
            };
            callback(JSON.stringify(res));
            con.end();
        }else{
            if(rows && rows.length){
                var id = rows[0].id;
                var sqlQuery2 = "SELECT title,body,datetime from notifications WHERE id=?;";
                con.query(sqlQuery2, [id], function(err, rows) {
                    if(err){
                        console.log(err); 
                        var res = {
                            "from":"getAllNotifications",
                            "result":"fail",
                            "reason":"database error"
                        };
                        callback(JSON.stringify(res));
                    }else{
                        if(rows && rows.length){
                            var length = rows.length;
                            var r = [];
                            for(var i=0;i<length;i++){
                                var datetime = ""+rows[i].datetime;
                                var title = rows[i].title;
                                var body = rows[i].body;
                                console.log(datetime);
                                r.push({datetime, title, body});
                                console.log(JSON.stringify(r));
                            }
                            var result = {
                                "from":"getAllNotifications",
                                "result":"success",
                                "data":r
                            };
                            callback(JSON.stringify(result));
                        }else{
                            var result = {
                                "from":"getAllNotifications",
                                "result":"fail",
                                "reason":"no notifications"
                            }
                            callback(JSON.stringify(result));
                        }
                    }
                });
                con.end();
            }else{
                var res = {
                    "from":"getAllNotifications",
                    "result":"fail",
                    "reason":"user not registered"
                };
                callback(JSON.stringify(res));
                con.end();
            }
        }
    });
}

module.exports = getAllNotifications;