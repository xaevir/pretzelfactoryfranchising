var app = require('../app')

app.get('/', function *() {
  //this.body = 'hello world bobby'
  yield this.render('index', {id:'home' });
});

app.get('/understand-us', function *() {
  //this.body = 'hello world bobby'
  yield this.render('understand-us', {id:'understand' });
});

