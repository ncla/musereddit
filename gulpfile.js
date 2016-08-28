var gulp = require('gulp');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');

gulp.task('build', function() {
    var stream = gulp.src('stylesheet.css')
        .pipe(replace('url(%%body%%)', 'url("http://i.imgur.com/Wk6WoG0.jpg")'))
        .pipe(replace('url(%%overlay%%)', 'url("http://i.imgur.com/mbLJ5Ty.png")'))
        .pipe(replace('url(%%header%%)', 'url("http://i.imgur.com/V9NpXIk.jpg")'))
        .pipe(replace('url(%%crosshatch%%)', 'url("http://i.imgur.com/i0KVyEX.png")'))
        .pipe(replace('url(%%editbuttons%%)', 'url("http://i.imgur.com/7pjTCyq.png")'))
        .pipe(replace('url(%%spritesheet%%)', 'url("http://i.imgur.com/u7T4Kgy.png")'))
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