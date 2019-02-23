const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');  
var nodemailer = require('nodemailer');

admin.initializeApp(functions.config().firebase);
const app = express();
app.use(bodyParser.json());
const db = admin.firestore();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prodprint2k19@gmail.com',
      pass: 'daksh2k19'
    }
  });

  app.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Content-Type");
    next();
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

app.post('/sendemail', (req,res) => {
    let data = req.body;
    let output;
    if(data.status === "Accepted") {
        var mailOptions = {
            from: 'prodprint2k19@gmail.com',
            to: `${data.userEmail}`,
            subject: 'Confirmation mail regarding your order',
            text: `Hello!, We are glad to inform to you that your has been accepted. Your order will be delivered in ${data.deliveryTime} days. Thank You for working with us! Please wait for the delivery email`    
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                output = {
                    status : "error",
                    error 
                }
                res.json(output);
                console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              output = {
                  status : "success",
              }
              let task;
              db.collection('orders').doc(`${data.id}`).get().then((snap) => {
                    if(snap.exists) {
                        task = snap.data();
                    }
              }).then(() => {
                  db.collection('tasks').doc(`${data.id}`).set(task).then(() => {
                    res.json(output);
                  })
              })
            }
          });
    }
    else if(data.status === "Rejected") {
        var mailOptions = {
            from: 'prodprint2k19@gmail.com',
            to: `${data.userEmail}`,
            subject: 'Confirmation mail regarding your order',
            text: `Hello!, We are sorry to inform to you that your order does not fit in our feasibility criteria.\n${"Reason : " + data.reason}.\n Please visit our website for proper criteria place an another order.`    
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                output = {
                    status : "error",
                    error 
                }
                res.json(output);
                console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              output = {
                  status : "success",
              }
              db.collection('orders').doc(`${data.id}`).delete().then(() => {
                  res.json(output);
              }).catch((err) => {
                  console.log(err);
              })
            }
        })
    }
    else if(data.status === "Deliver") {
        var mailOptions = {
            from: 'prodprint2k19@gmail.com',
            to: `${data.userEmail}`,
            subject: 'Confirmation mail regarding your order',
            text: `Hello!, We are glad to inform you that your order has been finished and dispatched.\n You'll be recieving the package in 2-3 working days`    
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                output = {
                    status : "error",
                    error 
                }
                res.json(output);
                console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              output = {
                  status : "success",
              }
              db.collection('orders').doc(`${data.id}`).delete().then(() => {
                db.collection('tasks').doc(`${data.id}`).delete().then(() => {
                    res.json(output);
                })  
              }).catch((err) => {
                  console.log(err);
              })
            }
        })
    }
})

exports.sendEmail = functions.https.onRequest(app);
