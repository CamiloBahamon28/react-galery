"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _config = _interopRequireDefault(require("../config"));

var _image = _interopRequireDefault(require("../models/image"));

var router = (0, _express.Router)();
var spacesEndpoint = new _awsSdk.default.Endpoint(_config.default.Endpoint);
var s3 = new _awsSdk.default.S3({
  endpoint: spacesEndpoint
});
router.post('/api/images/upload', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(req, res) {
    var file, urlImage, image;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            file = req.files.file;
            console.log(file);
            _context.prev = 2;
            _context.next = 5;
            return s3.putObject({
              ACL: 'public-read',
              //permisos con los que se sube el archivo
              Bucket: _config.default.BucketName,
              //en que carpeta se subira el archivo
              Body: file.data,
              // archivo que se esta subiendo
              Key: file.name //nombre al archivo que se sube

            }).promise();

          case 5:
            urlImage = "https://".concat(_config.default.BucketName, ".").concat(_config.default.Endpoint, "/").concat(file.name);
            image = new _image.default({
              url: urlImage,
              key: file.name,
              title: req.body.title
            });
            _context.next = 9;
            return image.save();

          case 9:
            return _context.abrupt("return", res.json(image));

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.send(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 12]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //subir una imagen al servidor

router.get('/api/images', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(req, res) {
    var images;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _image.default.find();

          case 2:
            images = _context2.sent;
            return _context2.abrupt("return", res.json(images));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //para listar todas la imagenes guardadas en la BD y en donde esta guardada

router.get('/api/images/:id', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(req, res) {
    var image;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _image.default.findById(req.params.id);

          case 2:
            image = _context3.sent;
            return _context3.abrupt("return", res.json(image));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //para obtener la info de una sola imagen

router.delete('/api/images/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(req, res) {
    var deletedImage;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return _image.default.findByIdAndDelete(req.params.id);

          case 2:
            deletedImage = _context4.sent;
            _context4.next = 5;
            return s3.deleteObject({
              Bucket: _config.default.BucketName,
              Key: deletedImage.key
            }).promise();

          case 5:
            res.json(deletedImage);

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //eliminar una imagen apartir de un id

var _default = router;
exports.default = _default;