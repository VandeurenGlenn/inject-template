'use strict';
const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const nsp = require('gulp-nsp');
const plumber = require('gulp-plumber');
const coveralls = require('gulp-coveralls');
const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');
const {mkdirSync, writeFileSync} = require('fs');
const del = require('del');
const isparta = require('isparta');

let cache;

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('pre-test', function () {
  return gulp.src('dist/**/*.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true,
      instrumenter: isparta.Instrumenter
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function (cb) {
  var mochaErr;

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('watch', function () {
  gulp.watch(['lib/**/*.js', 'test/**'], ['test']);
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('rollup', ['clean'], function () {
  return rollup({
    entry: 'lib/index.js',
     // Use the previous bundle as starting point.
    cache: cache
  }).then(bundle => {
    var result = bundle.generate({
        // output format - 'amd', 'cjs', 'es', 'iife', 'umd'
      format: 'cjs',
      plugins: [babel()]
    });
     // Cache our bundle for later use (optional)
    cache = bundle;
    mkdirSync('dist/');
    writeFileSync('dist/index.js', result.code);
  });
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('prepublish', ['nsp', 'rollup']);
gulp.task('default', ['static', 'test', 'coveralls']);
