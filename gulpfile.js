'use strict';

var gulp = require('gulp'),
    source = require('vinyl-source-stream');

var files = {
    html   : ['./index.html'],
    js     : ['./src/game.js', './src/**/*'],
    libs   : ['./libs/**/*']
};

gulp.task('html', function () {
    gulp.src(files.html)
        .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint'),
        stylish = require('jshint-stylish');

    gulp.src(files.js[1])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('js', function () {
    var browserify = require('browserify'),
    	es6ify = require('es6ify'),
        uglify = require('gulp-uglify'),
        buffer = require('vinyl-buffer');

    var bundler = browserify({
        entries: files.js[0]
    });

    var bundle = function() {
        return bundler
        	.add(es6ify.runtime)
        	.transform(es6ify)
            .bundle()
            .pipe(source(files.js[0]))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest('./dist/'));
    };

    return bundle();
});

gulp.task('libs', function () {
    gulp.src(files.libs)
        .pipe(gulp.dest('./dist/libs/'))
});

gulp.task('watch', function () {
    gulp.watch(files.js, ['default']);
});

gulp.task('compile', ['html']);

gulp.task('default', ['compile', 'libs', 'js']);
