'use strict';

const fs = require('fs');
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

const babelrc = fs.readFileSync('.babelrc');

gulp.task('babel', () =>
  gulp.src(['src/*.jsx', 'src/**/*.jsx'], {base: 'src'})
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel(
      JSON.parse(babelrc)
    ))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('lib'))
);

gulp.task('default', ['babel']);
