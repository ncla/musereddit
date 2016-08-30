var gulp = require('gulp');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;

gulp.task('build', function() {
    var stream = gulp.src('stylesheet.css')
        .pipe(gulpif((argv.production !== true), replace('url(%%body%%)', 'url("https://localhost:4443/images/body.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%overlay%%)', 'url("https://localhost:4443/images/overlay.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%header%%)', 'url("https://localhost:4443/images/header.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%crosshatch%%)', 'url("https://localhost:4443/images/crosshatch.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%editbuttons%%)', 'url("https://localhost:4443/images/editbuttons.png")')))
        .pipe(gulpif((argv.production !== true), replace('url(%%spritesheet%%)', 'url("https://localhost:4443/images/spritesheet.png")')))
        .pipe(cleanCSS({debug: true}))
        .pipe(gulp.dest('build/'));

    return stream;
});

gulp.task('watch', function() {
    var watcher = gulp.watch('stylesheet.css', ['build']);

    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});