var gulp = require('gulp');
var sass = require('gulp-sass');
var debug = require('gulp-debug');
var concat = require('gulp-concat');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var del = require('del');
var cleanCSS = require ('gulp-clean-css') ;

gulp.task('sass-styles', function () {
    return gulp.src('sass/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));

});

gulp.task('del_style', function(){
    return del('css/bundle.css{,.map}')
});

gulp.task('styles', gulp.series('del_style', function () {
    return gulp.src('{css,js}/**/*.css')
        .pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(postcss([autoprefixer()]))
        .pipe(concat('bundle.css'))
        .pipe(debug())
        .pipe(cleanCSS())
        .pipe(debug())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));

}));

gulp.task('make-styles', gulp.series('sass-styles', 'styles'));

gulp.task('watch', function(){
    gulp.watch('**/*.{scss, css}', gulp.series('make-styles'));
});

