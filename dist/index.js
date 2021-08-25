"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var http = _interopRequireWildcard(require("http"));

var _socket = _interopRequireDefault(require("socket.io"));

var _moment = _interopRequireDefault(require("moment"));

var _class = require("./class");

var _recursos = _interopRequireDefault(require("./recursos"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var puerto = 8080;

var publicPath = _path["default"].resolve(__dirname, '../public');

app.use(_express["default"]["static"](publicPath));
app.set('view engine', 'pug');

var viewsPath = _path["default"].resolve(__dirname, '../views');

app.set('views', viewsPath);
var myServer = http.Server(app);
myServer.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
app.get('/', function (req, res) {
  res.render('index');
});
var myWSServer = (0, _socket["default"])(myServer);
myWSServer.on('connection', function (socket) {
  console.log("El cliente ".concat(socket.client.id, " se ha conectado"));
  socket.on('new-product', function (data) {
    var newProduct = new _class.Producto(data.title, data.price, data.thumbnail, _class.productos[_class.productos.length - 1].id + 1);

    if (newProduct.title !== '' && newProduct.price !== '' && newProduct.thumbnail !== '') {
      console.log(newProduct);

      _class.productos.push(newProduct);
    } else {
      console.log('Error, campo vacio');
    }

    myWSServer.emit('products', _class.productos);
  });
  socket.on('new-message', function (data) {
    var newMessage = {
      mail: data.mail,
      texto: data.texto,
      time: (0, _moment["default"])().format('h:mm a')
    };
    console.log(newMessage);

    _class.mensajes.push(newMessage);

    myWSServer.emit('messages', _class.mensajes);
  });
  socket.on('askProducts', function (data) {
    socket.emit('products', _class.productos);
  });
  socket.on('askMessages', function (data) {
    socket.emit('messages', _class.mensajes);
  });
});
app.use('/api/productos', _recursos["default"]);