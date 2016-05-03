var Metalsmith  = require('metalsmith');
var sass        = require('metalsmith-sass');
var assets      = require('metalsmith-assets');
var markdown    = require('metalsmith-markdown-remarkable');
var prism       = require('metalsmith-prism');
var jade        = require('metalsmith-jade');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');
var mapsite     = require('metalsmith-mapsite');
var refills     = require('./bin/refills');

Metalsmith(__dirname)
  .destination('refills')
  .metadata({
    site: {
      name: 'Refills',
      basepath: '/refills'
    }
  })
  .use(refills())
  .use(assets({
    source: './assets',
    destination: './assets'
  }))
  .use(sass({
    outputDir: function(originalPath) {
      return originalPath.replace("scss", "css");
    }
  }))
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
  .build(function(err){
    if (err) throw err;
  });
