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
  yield this.render('index', {id: 'home', env: app.env });
});

app.get('/understand-us', function *() {
  //this.body = 'hello world bobby'
  yield this.render('understand-us', {id:'understand', env: app.env, title: 'Understand Us' });
});

app.post('/request-info', koaBody(), function *() {

  var constraint = {
    firstName: new Assert().Required(),
    lastName: new Assert().Required(),
    phone: new Assert().Required(),
    city: new Assert().Required(),
    country: new Assert().Required(),
    state: new Assert().Required(),
    email: [new Assert().Required(), new Assert().Email()],
    pretzelFactoryInterest: new Assert().Required()
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
    //bcc: 'bobby.chambers33@gmail.com',
    to: 'bobby.chambers33@gmail.com',
    subject: 'Philly Pretzel Factory Franchise Lead',
    text: 'firstName: ' + this.request.body.firstName + '\n' +
          'lastName: ' + this.request.body.lastName + '\n' +
          'phone: ' + this.request.body.phone + '\n' +
          'city: ' + this.request.body.city + '\n' +
          'pretzelFactoryInterest: ' + this.request.body.pretzelFactoryInterest + '\n' +
          'email: ' + this.request.body.email + '\n' +
          'country: ' + this.request.body.country + '\n' +
          'state: ' + this.request.body.state + '\n' +
          'formUrl: http://ownappf.com'
  };

  var response = yield sendMail(mailOptions);
  this.body = response.message;

});
