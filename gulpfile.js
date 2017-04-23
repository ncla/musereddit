var gulp = require('gulp');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var size = require('gulp-size');

gulp.task('build', function() {
    var stream = gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif((argv.production !== true), replace('url(%%body%%)', 'url("https://localhost:4443/images/body.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%overlay%%)', 'url("https://localhost:4443/images/overlay.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%header%%)', 'url("https://localhost:4443/images/header.jpg")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%crosshatch%%)', 'url("https://localhost:4443/images/crosshatch.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%editbuttons%%)', 'url("https://localhost:4443/images/editbuttons.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%spritesheet%%)', 'url("https://localhost:4443/images/spritesheet.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%flairsheet%%)', 'url("https://localhost:4443/images/flairsheet.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%header_hype%%)', 'url("https://localhost:4443/images/header_hype.jpg")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%guitarupvote%%)', 'url("https://localhost:4443/images/guitarupvote.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%guitardownvote%%)', 'url("https://localhost:4443/images/guitardownvote.png")')))
        .pipe(concatCss('stylesheet.css'))
        .pipe(cleanCSS({
            debug: true,
            compatibility: {
                properties: {
                    zeroUnits: false
                }
            }
        }))
        .pipe(size({
            title: 'Total sub-reddit stylesheet size',
            pretty: true,
            showFiles: true
        }))
        .pipe(gulp.dest('build/'));

    return stream;
});

gulp.task('watch', function() {
    gulp.watch("./scss/**/*.scss", ['build']);
});