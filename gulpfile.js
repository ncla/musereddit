var gulp = require('gulp');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concatCss = require('gulp-concat-css');

gulp.task('build', function() {
    var stream = gulp.src(['apicem.css', 'custom.css'])
        .pipe(gulpif((argv.production !== true), replace('url(%%body%%)', 'url("https://localhost:4443/images/body.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%overlay%%)', 'url("https://localhost:4443/images/overlay.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%header%%)', 'url("https://localhost:4443/images/header.jpg")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%crosshatch%%)', 'url("https://localhost:4443/images/crosshatch.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%editbuttons%%)', 'url("https://localhost:4443/images/editbuttons.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%spritesheet%%)', 'url("https://localhost:4443/images/spritesheet.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%flairsheet%%)', 'url("https://localhost:4443/images/flairsheet.png")')))
        .pipe(concatCss('stylesheet.css'))
        .pipe(cleanCSS({debug: true}))
        .pipe(gulp.dest('build/'));

    return stream;
});

gulp.task('watch', function() {
    var watcher = gulp.watch(['apicem.css', 'custom.css'], ['build']);

    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});