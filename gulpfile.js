'use strict';

var gulp = require('gulp')
  , less = require('gulp-less')
  , livereload = require('gulp-livereload')
  , util = require('gulp-util')
  , log = util.log
  , templateCache = require('gulp-angular-templatecache')
  , spritesmith = require('gulp.spritesmith');
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

gulp.task('ng-template', function () {
  log('Generate Angular template files ');
  gulp.src('public/js/templates/**/*.html')
    .pipe(templateCache({module: 'pretzelApp', root: '/js/templates'}))
    .pipe(gulp.dest('public/js'));
});

gulp.task('sprite', function () {
  var spriteData = gulp.src('public/img/icons/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    imgPath: '/img/sprite.png',
    engine: 'pngsmith',
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
  gulp.watch('public/js/templates/**/*.html', ['ng-template']);
  gulp.watch('public/img/icons/*.png', ['sprite']);
});

// Default Task
gulp.task('default', ['watch']);

