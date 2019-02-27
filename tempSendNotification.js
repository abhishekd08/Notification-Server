function notify(title, msg){

    const body_parser = require('body-parser');
    var jsonparser = body_parser.json();

    var http = require('http');
    var options = {
        host: "fcm.googleapis.com",
        path: "/fcm/send",
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": "key=AAAA2affqcw:APA91bFsr7K25_dXOZOGFAvz4IuAi9gWEUDs6tLiskhpquw3EOS5eLliSdWfPjbUSMOUDsa-Q-L52Grdmu4XZh78D0eUEfKtt_JZqo1_FI5qGR4FDop3dKOyQaayzp-PbCvtDgErwxIS"
        }
    };

    if(title && msg){
        var body = {
            "to":"eP58nY3kHvg:APA91bHUo06O_W_wp6c6sNnhT8GKkU1F4LUCpoF-v2Dzkd63uhrGG7X43Yjko4wj-UjKR2h53GuQBa_5uDCi77WUHkH0UsCntAgwYa85Y1zGT8xe6gDGzAEbUkfwzJl5LbRyzSb2xSJE",
            "priority":"high",
            "notification":{
                "title":""+title,
                "body":""+msg
            }
        };
    }else{
        var body = {
            "to":"eP58nY3kHvg:APA91bHUo06O_W_wp6c6sNnhT8GKkU1F4LUCpoF-v2Dzkd63uhrGG7X43Yjko4wj-UjKR2h53GuQBa_5uDCi77WUHkH0UsCntAgwYa85Y1zGT8xe6gDGzAEbUkfwzJl5LbRyzSb2xSJE",
            "priority":"high",
            "notification":{
                "title":"title from temp script",
                "body":"body from script"
            }
        };
    }

    var notifyRequest = http.request(options, function(res) {
        console.log("response status code : "+res.statusCode);
    
        res.on('data', function(d) {
            d = JSON.parse(d);
            //var results = d.results;
            var msg_id = d.results[0].message_id;
            if(msg_id == null){
                console.log("some error !");
                var error = d.results[0].error;
                console.log("error : "+error);
            }else{
                console.log("message sent successfully !");
            }
            console.log(d);
        });

        var result = {
            "statusCode": res.statusCode
        }
    });

    notifyRequest.write(JSON.stringify(body));
    notifyRequest.end();
}
//notify();

module.exports = notify;