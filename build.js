var Metalsmith = require('metalsmith');
var sass       = require('metalsmith-sass');
var assets     = require('metalsmith-assets');
var markdown   = require('metalsmith-markdown-remarkable');
var jade       = require('metalsmith-jade')
var layouts    = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata({
    site: {
      name: 'MY SITE'
    }
  })
  .use(assets({
    source: './assets',
    destination: './assets'
  }))
  .use(sass({
    outputDir: function(originalPath) {
      return originalPath.replace("scss", "css");
    }
  }))
  .use(markdown('full'))
  .use(jade())
  .use(permalinks({pattern: 'r/:slug_refill'}))
  .use(permalinks({pattern: 'b/:slug_binder'}))
  .use(layouts({engine:"jade"}))
  .use(hello)
  .build(function(err){
    if (err) throw err;
  });


function hello(files, metalsmith, done){
  for (var file in files) {
    console.log(file);
  }
  done();
}
