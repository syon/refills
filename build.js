var Metalsmith = require('metalsmith');
var asciidoc   = require('metalsmith-asciidoc');
var layouts    = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');

Metalsmith(__dirname)
  .metadata({
    site: {
      name: 'MY SITE'
    }
  })
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
