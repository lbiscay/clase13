"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _class = require("../src/class");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

var falla = '';

var validacion = function validacion(body) {
  if (Object.prototype.hasOwnProperty.call(body, 'title') && Object.prototype.hasOwnProperty.call(body, 'price') && Object.prototype.hasOwnProperty.call(body, 'thumbnail')) {
    if (body.title !== '' && body.price !== '' && body.thumbnail !== '') {
      return true;
    } else {
      falla = 'valores';
      return false;
    }
  } else {
    falla = 'keys';
    return false;
  }
};

router.put('/actualizar/:id', function (req, res) {
  var idSearch = Number(req.params.id);
  var body = req.body;

  if (validacion(body)) {
    var prodActualizado = new _class.Producto(body.title, body.price, body.thumbnail, idSearch);
    res.status(201).json({
      data: _class.productoDesdeClass.upgrade(_class.productos, idSearch, prodActualizado)
    });
  } else {
    res.status(400).json({
      Error: "No se modific\xF3 el producto, ".concat(falla, " faltantes")
    });
  }
});
router.post('/agregar', function (req, res) {
  var body = req.body;

  if (validacion(body)) {
    var nuevoProducto = new _class.Producto(body.title, body.price, body.thumbnail, _class.productos[_class.productos.length - 1].id + 1);

    _class.productoDesdeClass.write(_class.productos, nuevoProducto);

    res.redirect('/api/productos/guardar');
  } else {
    res.status(400).json({
      Error: "No se agreg\xF3 el producto, ".concat(falla, " faltantes")
    });
  }
});
router["delete"]('/borrar/:id', function (req, res) {
  var idSearch = Number(req.params.id);
  res.json({
    data: _class.productoDesdeClass["delete"](_class.productos, idSearch)
  });
});
router.get('/listar', function (req, res) {
  if (_class.productos.length === []) {
    return res.status(404).json({
      Error: 'No hay productos en la lista'
    });
  }

  res.json(_class.productoDesdeClass.read(_class.productos));
});
router.get('/listar/:id', function (req, res) {
  var idSearch = Number(req.params.id);

  if (!_class.productoDesdeClass.readOne(_class.productos, idSearch)) {
    return res.status(404).json({
      Error: 'Producto no encontrado'
    });
  }

  res.json({
    data: _class.productoDesdeClass.readOne(_class.productos, idSearch)
  });
});
router.get('/vista', function (req, res) {
  res.render('verProductos', {
    listaProductos: _class.productos,
    hayProductos: _class.productoDesdeClass.read(_class.productos).length !== 0
  });
});
var _default = router;
exports["default"] = _default;