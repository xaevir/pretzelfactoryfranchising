var koa = require('koa'),
    logger = require('koa-logger'),
    router = require('koa-router'),
    app = module.exports = koa(),
    serve = require('koa-static'),
    views = require('koa-views'),
    gzip = require('koa-gzip'),
    config = require('./config');

/**
 * Environment.
 */

if ('test' !== app.env) app.use(logger());
app.use(logger());
app.use(gzip());
app.use(serve(__dirname + '/app'));
app.use(views('views', { default: 'jade'}));

app.use(router(app));


require('./routes/index');

app.listen(config.app.port);
if (app.env !== 'test') {
  console.log('pretzel listening on port ' + config.app.port);
}
