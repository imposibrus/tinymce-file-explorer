
var express = require('express'),
    http = require('http'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    Q = require('q'),
    _ = require('lodash');

var storagePath = path.join(__dirname, 'storage');
app.get('/filesList', function(req, res, next) {
  var folder = _.without(_.compact(req.query.folder.split('/')), 'storage').join('/');
  //if(folder[0] == '/') {
  //  folder = folder.substr(1);
  //}

  getAllInDir(path.join(storagePath, folder)).done(function(filesStats) {
    res.send({status: 200, files: sortFiles(filesStats)});
  }, function(err) {
    next(err);
  });
});

var imageExtensions = ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff'];

/**
 * Scan dir by path and return all files and dirs inside it.
 * @param {String} dirPath
 * @returns {Promise}
 */
var getAllInDir = function(dirPath) {
  var defer = Q.defer();
  fs.readdir(dirPath, function(err, fileNames) {
    if(err) {
      return defer.reject(err);
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
        if(imageExtensions.indexOf(path.extname(fileName).toLowerCase() != -1)) {
          fileData.fileType = 'image';
        }
      } else if(fileStat.isDirectory()) {
        fileData.type = 'dir';
      }
      out.files.push(fileData);
    });

    defer.resolve(out.files);
  });

  return defer.promise;
};

/**
 * Sort files - dirs first, files last, by alphabet.
 * @param {Array} files
 * @returns {Array}
 */
var sortFiles = function(files) {
  return files.sort(function(a, b) {
    if(a.type == b.type) {
      return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
    } else {
      if(a.type == 'dir' && b.type == 'file') {
        return -1;
      } else if(a.type == 'file' && b.type == 'dir') {
        return 1;
      } else {
        return a.name > b.name ? 1 : -1;
      }
    }
  });
};

app.use(express.static(__dirname));


var server = http.createServer(app);
server.listen(3000);
