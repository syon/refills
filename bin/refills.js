module.exports = function(options) {
  return function(files, metalsmith, done) {
    var info = {};
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
