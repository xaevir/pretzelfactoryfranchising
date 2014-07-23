'use strict';

var gulp = require('gulp')
  , less = require('gulp-less')
  , livereload = require('gulp-livereload')
  , util = require('gulp-util')
  , concat = require('gulp-concat')
  , log = util.log
  , templateCache = require('gulp-angular-templatecache')
  , spritesmith = require('gulp.spritesmith')
  , ngmin = require('gulp-ngmin')
  , uglify = require('gulp-uglify')
  , jade = require('gulp-jade')
  , plumber = require('gulp-plumber')
  , minifyCSS = require('gulp-minify-css');
  //, watch = require('gulp-watch')
  //, notify = require('gulp-notify')


// change css to styles becasue have less in there
gulp.task('style', function () {
  log('Generate CSS files ' + (new Date()).toString());
  gulp.src('app/css/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('app/css'));
});

gulp.task('jade', function() {
  gulp.src('./testview/*.jade')
    .pipe(jade({pretty: true, locals: {}}))
    .pipe(gulp.dest('./testview/'));
});

gulp.task('compress', function() {
  gulp.src([
    'app/bower_components/jquery/jquery.js',
    'app/bower_components/angular/angular.js',
    'app/bower_components/angular-sanitize/angular-sanitize.js',
    'app/libs/ui-bootstrap-collapse-0.10.0.js',
    'app/js/app.js',
    'app/js/components/submit.js',
    'app/js/components/steps.js',
    'app/js/directives.js',
    'app/js/templates.js',
    'app/js/filters.js',
    'app/bower_components/owl.carousel/dist/owl.carousel.js',
    'app/bower_components/jquery-waypoints/waypoints.js',
    'app/bower_components/lodash/dist/lodash.min.js',
    'app/bower_components/bootstrap/js/collapse.js',
    'app/bower_components/ng-notify/dist/ng-notify.min.js',
  ])
    .pipe(concat('app.min.js'))
    .pipe(ngmin())
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});


//gulp.task('preprocesshtml', function() {
//  gulp.src('./view/*.jade')
//    .pipe(preprocess({context: { NODE_ENV: 'production', DEBUG: true}})) //To set environment variables in-line
//    .pipe(gulp.dest('./dist/'))
//});


gulp.task('ng-template', function () {
  log('Generate Angular template files ');
  gulp.src('app/js/templates/**/*.html')
    .pipe(templateCache({module: 'pretzelApp', root: '/js/templates'}))
    .pipe(gulp.dest('app/js'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('app/img/sprites/*').pipe(spritesmith({
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
  spriteData.img.pipe(gulp.dest('app/img/'));
  spriteData.css.pipe(gulp.dest('app/css/'));
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('app/css/**/*.less', ['style']).on('change', livereload.changed);
  //gulp.watch('views/*').on('change', livereload.changed);
  gulp.watch('app/js/templates/**/*.html', ['ng-template']);
  //gulp.watch('public/img/icons/*.png', ['sprite']);
  //gulp.watch('views/*.jade', ['jade']);
});

// Default Task
gulp.task('default', ['watch']);

