"use strict";

var gulp = require('gulp'),
	uglify = require("gulp-uglify"),
	jshint = require("gulp-jshint"),
	stylish = require("jshint-stylish"),
	concat = require("gulp-concat");

var input = 'angular-blocking-promise-manager.js',
	output = 'angular-blocking-promise-manager.min.js';

gulp.task("jshint", function() {
    return gulp.src(input)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task("default", ["jshint"], function() {
    return gulp.src(input)
        .pipe(uglify({
        	preserveComments: "license"
        }))
        .pipe(concat(output))
        .pipe(gulp.dest('./'));
});