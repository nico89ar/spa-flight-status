'use strict';
//dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');


var SCSS_SRC = './src/Assets/scss/**/*.scss';
var SCSS_DST = './src/Assets/css';

//compile SCSS
gulp.task('compile_scss', function(){

  gulp.src(SCSS_SRC)
  .pipe(sass().on('error',sass.logError))
  .pipe(minifyCSS())
  .pipe(rename({ suffix: '.min'}))
  .pipe(changed(SCSS_DST))
  .pipe(gulp.dest(SCSS_DST))
});

//detect changes in SCSS
gulp.task('watch_scss', function(){
  gulp.watch(SCSS_SRC, ['compile_scss']);
});

//default

//run tasks
gulp.task('default', ['watch_scss']);