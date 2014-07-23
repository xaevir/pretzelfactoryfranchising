var koa = require('koa'),
    logger = require('koa-logger'),
    router = require('koa-router'),
    app = module.exports = koa(),
    serve = require('koa-static'),
    views = require('koa-views');

/**
 * Environment.
 */

if ('test' !== app.env) app.use(logger());

app.use(logger());
app.use(serve(__dirname + '/app'));
app.use(views('views', { default: 'jade'}));

app.use(router(app));


require('./routes/index');

app.listen(8001);
console.log('listening on port 8001');
