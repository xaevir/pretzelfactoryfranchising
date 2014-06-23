var koa = require('koa'),
    logger = require('koa-logger'),
    router = require('koa-router'),
    app = module.exports = koa(),
    serve = require('koa-static'),
    betterBody = require('koa-better-body'),
    views = require('koa-views');

app.use(logger());
app.use(serve(__dirname + '/public'));
app.use(betterBody({patchNode: false, jsonLimit: '1kb', formLimit: '1kb'}));
app.use(views('views', { default: 'jade'}));

app.use(router(app));


require('./routes/index');

app.listen(8110);
console.log('listening on port 8110');
