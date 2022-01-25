var express = require('express');
var app = express();
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');
var sendEm = {};

sendEm.sendEmail = function (tipoFile, destino, asunto, replacements, res) {

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      }
      else {
        callback(null, html);
      }
    });
  };

  var smtpTransport = nodemailer.createTransport({
    //pool: true,
    /*host: "192.168.100.240",
    secureConnection: false,
    port: 25,
    auth: {
      user: "soporte",
      pass: "SupportCactun2021"
    },
    secure: false,
    tls: {
      rejectUnauthorized: false
    }*/
    service: 'gmail',
    auth: {
      user: 'cactunshop@gmail.com',
      pass: 'SupportCactun2021'
    }
  });


  readHTMLFile(__dirname + '/../templates/' + tipoFile + '.html', function (err, html) {
    var template = handlebars.compile(html);
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: 'soporte@cactunshop.com',
      to: destino,
      subject: asunto,
      html: htmlToSend
    };
    smtpTransport.sendMail(mailOptions, function (error, info) {
      //console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
        res.status(201).json({
          status: 'ok',
          respuesta: { 'status': '0', 'messsage': 'Error de Red, Intente luego por favor' },
        });
      } else {
        res.status(201).json({
          status: 'ok',
          respuesta: { 'status': '1', 'messsage': 'Registro Correcto' },
        });
        //console.log('Email sent: ' + info.response);
      }
    });
  });

}


/*sendEm.sendEmailRegister = function (tipoFile, destino, asunto, replacements) {

  var readHTMLFile = function (path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
      if (err) {
        throw err;
        callback(err);
      }
      else {
        callback(null, html);
      }
    });
  };

  var smtpTransport = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: "octaviobarre92@gmail.com",
      pass: "123456789LOKOIOP"
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  readHTMLFile(__dirname + '/../templates/' + tipoFile + '.html', function (err, html) {
    var template = handlebars.compile(html);
    var htmlToSend = template(replacements);
    var mailOptions = {
      from: 'support@indexacademy.org',
      to: destino,
      subject: asunto,
      html: htmlToSend
    };
    smtpTransport.sendMail(mailOptions, function (error, info) {
      //console.log("senMail returned!");
      if (error) {
        console.log("ERROR!!!!!!", error);
      } else {
        //console.log('Email sent: ' + info.response);
      }
    });
  });

}*/


module.exports = sendEm;