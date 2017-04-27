var gulp = require('gulp');
var replace = require('gulp-string-replace');
var cleanCSS = require('gulp-clean-css');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var concatCss = require('gulp-concat-css');
var sass = require('gulp-sass');
var size = require('gulp-size');

var jpgImages = ['header', 'header-hype'];

var replaceOptions = {
    logs: {
        enabled: false
    }
};

var cleanCSSoptions = {
    debug: true,
    compatibility: {
        properties: {
            zeroUnits: false
        }
    }
};

gulp.task('build', function() {
    return gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpif((argv.production !== true), replace(new RegExp('%%([a-zA-Z0-9-_]+)%%', 'gim'), function (replacement) {
            var file = replacement.replace(/%%/g, '');
            var extension = (jpgImages.indexOf(file) !== -1 ? 'jpg' : 'png');

            return `https://localhost:4443/images/${file}.${extension}`;
        }, replaceOptions)))
        .pipe(concatCss('stylesheet.css'))
        .pipe(cleanCSS(cleanCSSoptions))
        .pipe(replace('@charset "UTF-8";', '', replaceOptions))
        .pipe(size({
            title: 'Total sub-reddit stylesheet size',
            pretty: true,
            showFiles: true
        }))
        .pipe(gulpif((argv.production !== true), gulp.dest('build/')))
        .pipe(gulpif((argv.production === true), gulp.dest('build/dist/')));
});

gulp.task('watch', function() {
    gulp.watch("./scss/**/*.scss", ['build']);
});