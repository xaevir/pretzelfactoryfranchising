'use strict';

var app = require('../index'),
    koaBody = require('koa-better-body'),
    Validator = require( 'validator.js' ),
    Assert = Validator.Assert,
    validator = new Validator.Validator(),
    thunkify = require('co-thunkify'),
    nodemailer = require('nodemailer'),
    smtpTransport = nodemailer.createTransport('SMTP'),
    sendMail = thunkify(smtpTransport.sendMail);

app.get('/', function *() {
  yield this.render('index', {id: 'home'});
});

app.get('/understand-us', function *() {
  //this.body = 'hello world bobby'
  yield this.render('understand-us', {id:'understand' });
});

app.post('/request-info', koaBody(), function *() {

  var constraint = {
    name: new Assert().NotBlank(),
    email: [new Assert().NotBlank(), new Assert().Email()]
  };

  var res = validator.validate(this.request.body, constraint);
  if (res !== true) {
    this.status = 400;
    this.body = res;
    return;
  }

  var mailOptions = {
    from: 'Pretzel Factory Lead <lead@pretzelfactoryfranchising.com>',
    //to: 'phillypretzelfactory@franconnect.com',
    to: 'bobby.chambers33@gmail.com',
    bcc: 'bobby.chambers33@gmail.com',
    subject: 'Pretzel Factory Franchise Lead',
    text: 'name: ' + this.request.body.name + '\n' +
          'email: ' + this.request.body.email
  };

  var response = yield sendMail(mailOptions);
  this.body = response.message;

});
