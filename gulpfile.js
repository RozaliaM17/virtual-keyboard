const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglifycss = require('gulp-uglifycss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

var imagemin = require("gulp-imagemin");


gulp.task('scss', function () {
  return gulp.src('./src/scss/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest('./dist/css'));
});

 
gulp.task('css', function () {
  return gulp.src('./dist/css/*.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(rename('main.min.css'))
    .pipe(autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest('./dist/css/'));
});


gulp.task('scripts', function() {
  return gulp.src('./src/scripts/*.js')
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist/scripts'));
});


gulp.task("optimizeImages", function () {
  return gulp
    .src('./src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('run', gulp.series('scss', 'css', 'scripts', 'optimizeImages'));

gulp.task('watch', function() {
  gulp.watch('./src/scss/*.scss', gulp.series('scss'));
  gulp.watch('./src/css/*.css', gulp.series('css'));
  gulp.watch('./src/scripts/*.js', gulp.series('scripts'));
  gulp.watch('./src/images/*', gulp.series('optimizeImages'));
});

gulp.task('default', gulp.series('run', 'watch'));
