"use strict";

var sharp = require('sharp');

var fs = require('fs');

var paths = require('path');

var ProcessImage = function ProcessImage(path, format, width, height, quality, rotate) {
  var qualitys = parseInt(quality);
  var readStream = fs.createReadStream(path);
  var transfrom = sharp();

  if (format) {
    transfrom = transfrom.toFormat(format, {
      quality: qualitys
    });
  }

  if (rotate) {
    transfrom = transfrom.rotate(rotate);
  }

  if (width || height) {
    transfrom = transfrom.resize(width, height);
  }

  return readStream.pipe(transfrom);
};

module.exports.index = function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('index', {
            errorString: ''
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.uploadImage = function _callee2(req, res, next) {
  var _req$file, originalname, filename, path, size, mimetype, tailName, newPath, rootPath, rePath;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          if (req.file !== undefined) {
            _req$file = req.file, originalname = _req$file.originalname, filename = _req$file.filename, path = _req$file.path, size = _req$file.size, mimetype = _req$file.mimetype;
            tailName = mimetype.split('/');
            newPath = path.split('\\').slice(1).join('/');
            rootPath = paths.extname(originalname).toLocaleLowerCase();
            rePath = "public/uploads/".concat(originalname);

            if (rootPath === ".png" || rootPath === ".jpg" || rootPath === ".webp") {
              fs.rename(path, rePath, function (err) {
                if (err) {
                  throw err;
                }

                res.render('form', {
                  originalname: originalname,
                  filename: filename,
                  path: rePath,
                  size: size,
                  tailName: tailName[1]
                });
              });
            } else {
              res.render('index', {
                errorString: 'Không hỗ trợ định đạng ' + tailName[1]
              });
            }
          } else {
            res.render('index', {
              errorString: 'File chưa được chọn'
            });
          }

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.ProcessImages = function _callee3(req, res, next) {
  var _req$body, quality, typeImg, width, height, innerPath, widthInt, heightInt, qualityInt, names;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, quality = _req$body.quality, typeImg = _req$body.typeImg, width = _req$body.width, height = _req$body.height, innerPath = _req$body.innerPath;
          widthInt = width ? parseInt(width) : width;
          heightInt = height ? parseInt(height) : height;
          qualityInt = quality ? parseInt(quality) : quality;
          names = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 25);
          console.log(names); //const tranform = sharp(innerPath).resize(widthInt,heightInt).toFormat(typeImg,{quality:qualityInt}).toFile('image/names.'+typeImg);

          res.type("image/".concat(typeImg || 'png'));
          ProcessImage(innerPath, typeImg, widthInt, heightInt, quality, 0).pipe(res); //  res.render('result',{innerPath});

        case 8:
        case "end":
          return _context3.stop();
      }
    }
  });
};