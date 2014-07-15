var koa = require('koa'),
    logger = require('koa-logger'),
    router = require('koa-router'),
    app = module.exports = koa(),
    serve = require('koa-static'),
    views = require('koa-views');

/**
 * Environment.
 */

var env = process.env.NODE_ENV || 'development';

if ('test' !== env) app.use(logger());

app.use(logger());
app.use(serve(__dirname + '/app'));
app.use(views('views', { default: 'jade'}));

app.use(router(app));


require('./routes/index');

app.listen(8110);
console.log('listening on port 8110');
