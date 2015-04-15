
var express = require('express'),
    http = require('http'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    Q = require('q');

var storagePath = path.join(__dirname, 'storage');
app.use('/storage', function(req, res, next) {
  getAllInDir(storagePath).done(function(filesStats) {
    res.send({status: 200, files: filesStats});
  }, function(err) {
    next(err);
  });
});

var getAllInDir = function(dirPath) {
  var defer = Q.defer();
  fs.readdir(dirPath, function(err, fileNames) {
    if(err) {
      return next(err);
    }

    var out = {
      files: []
    };
    fileNames.forEach(function(fileName) {
      var fileStat = fs.statSync(path.join(dirPath, fileName)),
          fileData = {
            name: fileName,
            //path: path.join(dirPath, fileName),
            size: fileStat.size
          };

      if(fileStat.isFile()) {
        fileData.type = 'file';
      } else if(fileStat.isDirectory()) {
        fileData.type = 'dir';
      }
      out.files.push(fileData);
    });

    defer.resolve(out.files);
  });

  return defer.promise;
};

app.use(express.static(__dirname));


var server = http.createServer(app);
server.listen(3000);
