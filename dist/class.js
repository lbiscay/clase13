"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productoDesdeClass = exports.Producto = exports.formatMessages = exports.mensajes = exports.productos = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var productos = [{
  title: 'Taza',
  price: 150,
  thumbnail: 'https://image.flaticon.com/icons/png/128/2252/2252716.png',
  id: 1
}, {
  title: 'Vaso',
  price: 100,
  thumbnail: 'https://image.flaticon.com/icons/png/128/4211/4211073.png',
  id: 2
}, {
  title: 'Plato',
  price: 200,
  thumbnail: 'https://image.flaticon.com/icons/png/128/103/103137.png',
  id: 3
}, {
  title: 'Cuchillo',
  price: 175,
  thumbnail: 'https://image.flaticon.com/icons/png/128/620/620298.png',
  id: 4
}, {
  title: 'Tenedor',
  price: 125,
  thumbnail: 'https://image.flaticon.com/icons/png/128/368/368044.png',
  id: 5
}];
exports.productos = productos;
var mensajes = [];
exports.mensajes = mensajes;

var formatMessages = function formatMessages(data) {
  var mail = data.mail,
      texto = data.texto;
  return {
    mail: mail,
    texto: texto,
    time: (0, _moment["default"])().format('h:mm a')
  };
};

exports.formatMessages = formatMessages;

var Producto = /*#__PURE__*/function () {
  function Producto(title, price, thumbnail, id) {
    _classCallCheck(this, Producto);

    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = id;
  }

  _createClass(Producto, [{
    key: "read",
    value: function read(array) {
      return array;
    }
  }, {
    key: "readOne",
    value: function readOne(array, id) {
      var productoPorId = array.find(function (idProd) {
        return idProd.id == id;
      });
      return productoPorId;
    }
  }, {
    key: "write",
    value: function write(array, nuevoProducto) {
      array.push(nuevoProducto);
      return nuevoProducto;
    }
  }, {
    key: "upgrade",
    value: function upgrade(array, id, prodActualizado) {
      if (array.find(function (prod) {
        return prod.id === id;
      })) {
        var productoAActualizar = array.find(function (prod) {
          return prod.id === id;
        });
        array[array.indexOf(productoAActualizar)] = prodActualizado;
        return prodActualizado;
      } else {
        return 'Error, producto inexistente.';
      }
    }
  }, {
    key: "delete",
    value: function _delete(array, id) {
      var productoEliminado = array.find(function (prod) {
        return prod.id === id;
      });
      array.indexOf(productoEliminado);
      array.splice(array.indexOf(productoEliminado), 1);
      return productoEliminado;
    }
  }]);

  return Producto;
}();

exports.Producto = Producto;
var productoDesdeClass = new Producto();
exports.productoDesdeClass = productoDesdeClass;