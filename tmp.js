function tmp(){
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
        }; 
    });

    var q = "SELECT * FROM notifications;";
    con.query(q, function(err, rows){
        if(err){
            console.log(err);
        }else{
            console.log("no error");
            var length = rows.length;
            var r = [];
            for(var i=0;i<length;i++ ){
                // console.log(rows[i].title);
                // console.log(rows[i].datetime);
                r.push({dateTime:rows[i].datetime, title:rows[i].title, body:rows[i].body});
            }
            var result = {
                "from":"getAllNotifications",
                "result":"success",
                "data":JSON.stringify(r)
            };
            console.log(result);
        }
    });
    con.end();
}
tmp();