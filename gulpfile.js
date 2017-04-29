var gulp = require('gulp');
var gulpsmith = require('gulpsmith');
var gulp_front_matter = require('gulp-front-matter');
var assign = require('lodash.assign');

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

gulp.task('metalsmith', function () {
  var Metalsmith   = require('metalsmith');
  var drafts       = require('metalsmith-drafts');
  var collections  = require('metalsmith-collections');
  var less         = require('metalsmith-less');
  var autoprefixer = require('metalsmith-autoprefixer');
  var assets       = require('metalsmith-assets');
  var asciidoc     = require('metalsmith-asciidoc');
  var markdown     = require('metalsmith-markdown-remarkable');
  var prism        = require('metalsmith-prism');
  var jade         = require('metalsmith-jade');
  var layouts      = require('metalsmith-layouts');
  var permalinks   = require('metalsmith-permalinks');
  var mapsite      = require('metalsmith-mapsite');
  var watch        = require('metalsmith-watch');
  var refills      = require('./bin/refills');

  function draftsInDev() {
    if (process.env.NODE_ENV !== 'development') {
      return drafts();
    } else {
      return function(){};
    }
  }

  function watching() {
    if (process.env.NODE_ENV === 'development') {
      return watch({
        paths: {
          "${source}/**/*": "**/*",
          "layouts/**/*": "**/*",
          "assets/**/*": "**/*"
        },
        livereload: true,
      });
    }
  }

  return gulp.src("./src/**/*")
    .pipe(gulp_front_matter()).on("data", function(file) {
      assign(file, file.frontMatter); 
      delete file.frontMatter;
    })
    .pipe(
      gulpsmith(__dirname)
        .metadata({
          site: {
            name: 'Refills',
            basepath: '/refills',
            baseurl: 'https://syon.github.io/refills'
          },
          env: {
            NODE_ENV: process.env.NODE_ENV
          }
        })
        .use(draftsInDev())
        .use(collections({
          recent: {
            pattern: 'refills/*/*.{md,adoc}',
            sortBy: 'date',
            limit: 10,
            reverse: true
          },
          all: {
            pattern: 'refills/*/*.{md,adoc}',
            sortBy: 'date',
            reverse: true
          }
        }))
        .use(refills())
        .use(assets({
          source: './assets',
          destination: './assets'
        }))
        .use(asciidoc())
        .use(markdown('full', {
          html: true,
          linkify: true,
          typographer: true
        }))
        .use(prism())
        .use(jade({useMetadata: true}))
        // .use(permalinks({pattern: ':bid/:rcd'})) // Legacy Refills
        // .use(permalinks({pattern: ':idx'})) // Legacy Binders
        .use(permalinks({pattern: 'rid/:rid'})) // New Refills
        .use(permalinks({pattern: 'bid/:idx'})) // New Binders
        .use(layouts({engine: 'jade'}))
        .use(mapsite({
          hostname: 'https://syon.github.io/refills/',
          omitIndex: true
        }))
        .use(watching())
    )
    .pipe(gulp.dest('./dest'));
});

gulp.task('default', [ 'css', 'metalsmith' ]);
