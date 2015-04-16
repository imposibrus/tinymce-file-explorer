
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    livereload = require('gulp-livereload');

gulp.task('stylus', function () {
  gulp.src(['css/main.styl'])
      .pipe(stylus())
      .pipe(gulp.dest('css'))
      .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('css/*.styl', ['stylus']);
  gulp.watch('js/**/*.js').on('change', livereload.changed);
  gulp.watch('*.html').on('change', livereload.changed);
});

gulp.task('default', ['stylus', 'watch']);
