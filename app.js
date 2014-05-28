var koa = require('koa')
var logger = require('koa-logger');
var router = require('koa-router');
var app = module.exports = koa()
var serve = require('koa-static');
var betterBody = require('koa-better-body')
var views = require('koa-views')

app.use(logger());
app.use(serve(__dirname + '/public'));
app.use(betterBody({patchNode: false, jsonLimit: '1kb', formLimit: '1kb'}));
app.use(views('views', { default: 'jade'}));
app.use(router(app));


require('./routes/index')

app.listen(8110);
console.log('listening on port 8110')
