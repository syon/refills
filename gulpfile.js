var gulp = require('gulp');
var gulpsmith = require('gulpsmith');
var gulp_front_matter = require('gulp-front-matter');
var del = require('del');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-clean-css');
var runSequence = require('run-sequence');

var DEST_DIR = './refills';

gulp.task('clean', () => {
  return del([DEST_DIR]);
});

gulp.task('css', () => {
  var postcss = require('gulp-postcss');
  var precss = require('precss');
  var autoprefixer = require('autoprefixer');
  var plugins = [
    precss({}),
    autoprefixer({browsers: ['defaults']})
  ];
  return gulp.src('./assets/*.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest(`${DEST_DIR}/assets`));
});

gulp.task('css-concat', () => {
  return gulp.src([
      `${DEST_DIR}/assets/vendor/prism.css`,
      `${DEST_DIR}/assets/app.css`,
    ])
    .pipe(concat('bundle.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(`${DEST_DIR}/assets`));
});

gulp.task('assets-after', () => {
  return del([
    `${DEST_DIR}/assets/vendor/prism.css`,
    `${DEST_DIR}/assets/_yoi.css`,
    `${DEST_DIR}/assets/_yoi-asciidoc.css`,
    `${DEST_DIR}/assets/app.css`,
  ]);
});


gulp.task('metalsmith', () => {
  var Metalsmith   = require('metalsmith');
  var drafts       = require('metalsmith-drafts');
  var collections  = require('metalsmith-collections');
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
    .pipe(gulp_front_matter()).on("data", file => {
      Object.assign(file, file.frontMatter); 
      delete file.frontMatter;
    })
    .pipe(
      gulpsmith(__dirname)
        .metadata({
          site: {
            name: 'Refills',
            basepath: '/refills',
            baseurl: 'https://syon.github.io/refills',
            s3url: 'https://s3-ap-northeast-1.amazonaws.com/syon.github.io/refills',
          },
          env: {
            NODE_ENV: process.env.NODE_ENV
          }
        })
        .use(draftsInDev())
        .use(collections({
          all: {
            pattern: 'refills/*/*.{md,adoc}',
            sortBy: (a, b) => {
              a = new Date(a.date);
              b = new Date(b.date);
              if (!a && !b) return 0;
              if (!a) return -1;
              if (!b) return 1;
              if (b > a) return -1;
              if (a > b) return 1;
              return -1;
            },
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
    .pipe(gulp.dest(DEST_DIR));
});

gulp.task('default', () => {
  runSequence('clean', 'metalsmith', 'css', 'css-concat', 'assets-after');
});
