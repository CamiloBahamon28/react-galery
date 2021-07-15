"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _index = _interopRequireDefault(require("./routes/index.routes"));

var _images = _interopRequireDefault(require("./routes/images.routes"));

require("./database");

//importando las rutas
var app = (0, _express.default)();
app.set('port', process.env.PORT || 4000);
app.use((0, _expressFileupload.default)({
  tempFileDir: '/temp' //para guardar los archivos en una carpeta temporal

})); //utilizando las rutas

app.use(_index.default);
app.use(_images.default);
app.listen(app.get('port'));
console.log('Server Port', app.get('port'));