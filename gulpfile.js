const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('commonSass', () => {
  gulp.src('public/assets/sass/common.scss')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/assets/style/'));
});
// 编译总体样式

gulp.task('sass', () => {
  gulp.watch(['public/assets/sass/*.scss', 'public/assets/sass/**/*.scss'], ['commonSass']);
});

