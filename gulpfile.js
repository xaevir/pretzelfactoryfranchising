'use strict';

var gulp = require('gulp')
  , less = require('gulp-less')
  , livereload = require('gulp-livereload')
  , util = require('gulp-util')
  , concat = require('gulp-concat')
  , log = util.log
  , templateCache = require('gulp-angular-templatecache')
  , spritesmith = require('gulp.spritesmith')
  //, ngmin = require('gulp-ngmin')
  //, uglify = require('gulp-uglify')
  , jade = require('gulp-jade');
  //, watch = require('gulp-watch')
  //, notify = require('gulp-notify')


// change css to styles becasue have less in there
gulp.task('style', function () {
  log('Generate CSS files ' + (new Date()).toString());
  gulp.src('public/css/main.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload());
});

gulp.task('jade', function() {
  gulp.src('./testview/*.jade')
    .pipe(jade({pretty: true, locals: {}}))
    .pipe(gulp.dest('./testview/'));
});


gulp.task('compress', function() {
  gulp.src([
    'public/js/jquery.js',
    'public/js/angular.js',
    'public/js/ui-bootstrap-tpls-0.11.0.js',
    'public/js/waypoints.min.js',
    'public/js/ng-me.js',
    'public/js/views/steps.js',
    'public/js/templates.js',
    'public/js/owl.carousel/owl.carousel.js'
  ])
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('public/js'));
});


//gulp.task('preprocesshtml', function() {
//  gulp.src('./view/*.jade')
//    .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}})) //To set environment variables in-line
//    .pipe(gulp.dest('./dist/'))
//});


gulp.task('ng-template', function () {
  log('Generate Angular template files ');
  gulp.src('public/js/templates/**/*.html')
    .pipe(templateCache({module: 'pretzelApp', root: '/js/templates'}))
    .pipe(gulp.dest('public/js'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('public/img/sprites/*').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: '/img/sprite.png',
    engine: 'gm',
    cssOpts: {
      cssClass: function (item) {
        return '.sprite-' + item.name;
      }
    }
  }));
  spriteData.img.pipe(gulp.dest('public/img/'));
  spriteData.css.pipe(gulp.dest('public/css/'));
});


gulp.task('watch', function() {
  gulp.watch('public/css/**/*.less', ['style']);
  //gulp.watch('public/js/templates/**/*.html', ['ng-template']);
  //gulp.watch('public/img/icons/*.png', ['sprite']);
  //gulp.watch('views/*.jade', ['jade']);
  //livereload.listen();
  //gulp.watch('views/*').on('change', livereload.changed);
});

// Default Task
gulp.task('default', ['watch']);

