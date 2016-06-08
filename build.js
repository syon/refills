var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var sass        = require('metalsmith-sass');
var assets      = require('metalsmith-assets');
var markdown    = require('metalsmith-markdown-remarkable');
var prism       = require('metalsmith-prism');
var jade        = require('metalsmith-jade');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var mapsite     = require('metalsmith-mapsite');
var watch       = require('metalsmith-watch');
var refills     = require('./bin/refills');
var dotenv      = require('dotenv');

dotenv.config();

function watching() {
  if (process.env.NODE_ENV == 'development') {
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

Metalsmith(__dirname)
  .destination('refills')
  .metadata({
    site: {
      name: 'Refills',
      basepath: '/refills'
    }
  })
  .use(collections({
    recent: {
      pattern: 'refills/*/*.md',
      sortBy: 'date',
      limit: 10,
      reverse: true
    }
  }))
  .use(refills())
  .use(assets({
    source: './assets',
    destination: './assets'
  }))
  .use(sass())
  .use(markdown('full', {
    html: true,
    linkify: true,
    typographer: true
  }))
  .use(prism())
  .use(jade({useMetadata: true}))
  .use(permalinks({pattern: ':bid/:rid'}))
  .use(permalinks({pattern: ':idx'}))
  .use(layouts({engine: 'jade'}))
  .use(mapsite({
    hostname: 'http://syon.github.io/refills/'
  }))
  .use(watching())
  .build(function(err){
    if (err) throw err;
  });
