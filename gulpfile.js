var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    express = require('express'),
    server = require('./server');

gulp.task('copy-fonts', function() {

    gulp.src('./fonts/*')
        .pipe(gulp.dest('./dist'));

});

gulp.task('sass', function() {

    return gulp.src('./styles/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('browserify-watch', function () {

    var bundler = watchify(browserify('./src/main.js', watchify.args));

    bundler.on('update', function() {
        var hrTime = process.hrtime();
        var t1 = hrTime[0] * 1000 + hrTime[1] / 1000000;
        rebundle();
        hrTime = process.hrtime();
        var t2 = hrTime[0] * 1000 + hrTime[1] / 1000000;
        gutil.log('Rebundle took ' + Math.round(t2-t1) + ' ms');
    });

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', gutil.log.bind(gutil, 'Browserify Error'))
            .pipe(source('bundle.js'))
            //.pipe(buffer())           // TODO Add these 2 lines back in to minify output!
            //.pipe(uglify())
            .pipe(gulp.dest('./dist'));
    }

    return rebundle();
});

gulp.task('watch', ['browserify-watch'], function() {
    gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('server', ['copy-fonts','sass','watch'], function() {
    server.startExpress();
});

gulp.task('default', ['server'], function() {
});
