var sendNotification = function(token, mail, title, msg, dateTime, callback){

    //TODO send dateTime in request body 
    // dateTime is not being used anywhere

    console.log("sendNotifications Logs");
    console.log("parameters : "+token+"\n\n")
    console.log("mail "+mail+", title:"+title+", body:"+msg+", datetime:"+dateTime+" :::::::::END")

    var http = require('http');
    var options = {
        host: "fcm.googleapis.com",
        port: "80",
        path: "/fcm/send",
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": "key=AAAA2affqcw:APA91bFsr7K25_dXOZOGFAvz4IuAi9gWEUDs6tLiskhpquw3EOS5eLliSdWfPjbUSMOUDsa-Q-L52Grdmu4XZh78D0eUEfKtt_JZqo1_FI5qGR4FDop3dKOyQaayzp-PbCvtDgErwxIS"
        }
    };
    var body = {
        "to":""+token,
        "notification":{
            "title":title,
            "body":dateTime+" MSG "+msg
        },
        "data":{
            "datetime":dateTime
        }
    };

    console.log("notification body : "+JSON.stringify(body));

    var notifyRequest = http.request(options, function(res) {
        console.log("notification response for "+mail+" status code : "+res.statusCode);

        res.on('data', function(c) {
            c = JSON.parse(c);
            console.log(c);
            console.log("message_id ---> "+c.results[0].message_id);
            if(c.results[0].message_id){
                console.log(mail + " ::: "+ "notification sent !");
                var result = {
                    "from":"sendNotification",
                    "result":"success"
                };
                //callback(JSON.stringify(result));
            }else{
                error = c.results[0].error;
                console.log(mail+" ::: error : "+error);
                var tempSendNotification = require('./tempSendNotification');
                tempSendNotification("Some error in production !", ""+error);
                
                var result = {
                    "from":"sendNotification",
                    "result":"fail",
                    "reason":""+error
                };
                //callback(JSON.stringify(result));
            }
        });
    });
    notifyRequest.write(JSON.stringify(body));
    notifyRequest.end();
}

module.exports = sendNotification;