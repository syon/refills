var Metalsmith = require('metalsmith');
var sass       = require('metalsmith-sass');
var assets     = require('metalsmith-assets');
var asciidoc   = require('metalsmith-asciidoc');
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
  .use(asciidoc())
  .use(permalinks({pattern: ':dir/:slug'}))
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
