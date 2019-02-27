const express = require('express');
const body_parser = require('body-parser');

var app = express();
var jsonparser = body_parser.json();

// Node API

app.post('/sendNotification', jsonparser, function(req, res) {
    
    var mail = req.body.mail;
    var pass = req.body.pass;
    var title = req.body.title;
    var body = req.body.body;
    var dateTime = req.body.datetime;

    console.log("mail: "+mail);
    console.log("pass: "+pass);
    console.log("body : \n"+req.body);

    var getUserId = require('./getFCMUserIdFromMailPass');
    getUserId(mail, pass, function(response) {
        response = JSON.parse(response);
        console.log("getUserId Response : "+response.result);
        if(response.result == "success"){
            var id = response.token+"";
            var sendNotification = require('./sendNotification');
            console.log("id from server.js ::: "+id);
            sendNotification(id, mail, title, body, dateTime);
        

            var saveNotification = require('./saveNotification');
            saveNotification(mail, title, body, dateTime, function(response3) {
                response3 = JSON.parse(response3);
                
                if(response3.result == "success"){
                    var result = {
                        "from":"sendNotification",
                        "result":"success"
                    };
                    res.end(JSON.stringify(result));
                }else{
                    var result = {
                        "from":"sendNotification",
                        "result":"fail",
                        "reason":"saveNotification error"
                    };
                    res.end(JSON.stringify(result));
                }
            });
            

            // sendNotification(id, mail, title, body, function(response2) {
            //     sendNotificationresponse = JSON.parse(response2);

            //     if(sendNotificationresponse.result == "success"){
            //         //TODO save notification to database
            //         var saveNotification = require('./saveNotification');
            //         saveNotification(mail, title, body, dateTime, function(response3) {
            //             response3 = JSON.parse(response3);
                        
            //             if(response3.result == "success"){
            //                 var result = {
            //                     "from":"sendNotification",
            //                     "result":"success"
            //                 };
            //                 res.end(JSON.stringify(result));
            //             }else{
            //                 var result = {
            //                     "from":"sendNotification",
            //                     "result":"fail",
            //                     "reason":"saveNotification error"
            //                 };
            //                 res.end(JSON.stringify(result));
            //             }
            //         });

            //     }else{
            //         res.end(JSON.stringify(sendNotificationresponse));
            //     }
            // });

        }else{
            console.log("getUserId response reason : "+response.reason);
            res.end(JSON.stringify(response));
        }
    });
});


// Mobile API 

app.post('/getAllNotifications', jsonparser, function(req,res) {
    
    var mail = req.body.mail;
    var pass = req.body.pass;

    var getAllNotifications = require('./getAllNotifications');
    getAllNotifications(mail, pass, function(response) {
        response = JSON.parse(response);
        res.end(JSON.stringify(response));
    });
});

app.post("/updateToken",jsonparser, function(req,res) {
    
    var mail = req.body.mail;
    var pass = req.body.pass;
    var token = req.body.token;

    var updateToken = require('./updateToken');
    updateToken(mail, pass, token, function(response) {
        response = JSON.parse(response);
        res.end(JSON.stringify(response));
    });
});

app.post("/deleteNotification", jsonparser, function(req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var datetime = req.body.datetime;

    var deleteNotification = require('./deleteNotification');
    deleteNotification(title, body, datetime, function(response) {
        response = JSON.parse(response);
        res.end(JSON.stringify(response));
    });
});

app.post("/signIn", jsonparser, function(req, res) {

    var mail = req.body.mail;
    var pass = req.body.pass;
    var token = req.body.token;

    var signIn = require('./signIn');
    signIn(mail, pass, token, function(response) {
        response = JSON.parse(response);
        res.end(JSON.stringify(response));
    });
});

app.post('/registerUser', jsonparser, function(req,res) {
    
    var mail = req.body.mail;
    var pass = req.body.pass;
    var token = req.body.token;
    
    var registerUser = require('./registerUser');
    registerUser(mail, pass, token, function(response) {
        response = JSON.parse(response);
        res.end(JSON.stringify(response));
    });
});

app.listen(4545)
