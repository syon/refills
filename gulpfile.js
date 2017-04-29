var gulp = require('gulp');

gulp.task('css', function () {
  var postcss = require('gulp-postcss');
  var rename = require('gulp-rename')
  var precss = require('precss');
  var autoprefixer = require('autoprefixer');
  var plugins = [
    precss({}),
    autoprefixer({browsers: ['defaults']})
  ];
  return gulp.src('./assets/*.pcss')
    .pipe(postcss(plugins))
    .pipe(rename({extname: '.css'}))
    .pipe(gulp.dest('./assets'));
});

gulp.task('default', [ 'css' ]);
