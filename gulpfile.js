var gulp = require('gulp');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');

gulp.task('build', function() {
    var stream = gulp.src('stylesheet.css')
        .pipe(replace('url(%%body%%)', 'url("https://localhost:4443/images/body.png")'))
        .pipe(replace('url(%%overlay%%)', 'url("https://localhost:4443/images/overlay.png")'))
        .pipe(replace('url(%%header%%)', 'url("https://localhost:4443/images/header.png")'))
        .pipe(replace('url(%%crosshatch%%)', 'url("https://localhost:4443/images/crosshatch.png")'))
        .pipe(replace('url(%%editbuttons%%)', 'url("https://localhost:4443/images/editbuttons.png")'))
        .pipe(replace('url(%%spritesheet%%)', 'url("https://localhost:4443/images/spritesheet.png")'))
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