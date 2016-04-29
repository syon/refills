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

Metalsmith(__dirname)
  .destination('refills')
  .metadata({
    site: {
      name: 'Refills',
      basepath: '/refills'
    }
  })
  .use(collections({
    refills: {
      pattern: 'refills/*/*.md'
    }
  }))
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
  .use(layouts({engine: 'jade'}))
  .use(mapsite({
    hostname: 'http://syon.github.io/refills/'
  }))
  .build(function(err){
    if (err) throw err;
  });

function refills() {
  var info = {};
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file){
      var data = files[file];
      if (data.bid) {
        if (!info[data.bid]) {
          // initialize
          info[data.bid] = { info: {}, refills: {} };
        }
        if (data.rids) {
          // index
          info[data.bid].info = data;
        } else {
          // refill
          info[data.bid].refills[data.rid] = data;
        }
      }
    });
    var metadata = metalsmith.metadata();
    metadata.summary = info;
    done();
  }
}
