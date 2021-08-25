import express from 'express';
import { productos, Producto, productoDesdeClass } from './class';

const router = express.Router();

let falla = '';
const validacion = (body) => {
  if (
    Object.prototype.hasOwnProperty.call(body, 'title') &&
    Object.prototype.hasOwnProperty.call(body, 'price') &&
    Object.prototype.hasOwnProperty.call(body, 'thumbnail')
  ) {
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

router.put('/actualizar/:id', (req, res) => {
  const idSearch = Number(req.params.id);
  const { body } = req;

  if (validacion(body)) {
    const prodActualizado = new Producto(
      body.title,
      body.price,
      body.thumbnail,
      idSearch
    );
    res.status(201).json({
      data: productoDesdeClass.upgrade(productos, idSearch, prodActualizado),
    });
  } else {
    res.status(400).json({
      Error: `No se modificó el producto, ${falla} faltantes`,
    });
  }
});

router.post('/agregar', (req, res) => {
  const { body } = req;
  if (validacion(body)) {
    const nuevoProducto = new Producto(
      body.title,
      body.price,
      body.thumbnail,
      productos[productos.length - 1].id + 1
    );
    productoDesdeClass.write(productos, nuevoProducto);
    res.redirect('/api/productos/guardar');
  } else {
    res.status(400).json({
      Error: `No se agregó el producto, ${falla} faltantes`,
    });
  }
});

router.delete('/borrar/:id', (req, res) => {
  const idSearch = Number(req.params.id);

  res.json({
    data: productoDesdeClass.delete(productos, idSearch),
  });
});

router.get('/listar', (req, res) => {
  if (productos.length === []) {
    return res.status(404).json({
      Error: 'No hay productos en la lista',
    });
  }
  res.json(productoDesdeClass.read(productos));
});

router.get('/listar/:id', (req, res) => {
  const idSearch = Number(req.params.id);

  if (!productoDesdeClass.readOne(productos, idSearch)) {
    return res.status(404).json({
      Error: 'Producto no encontrado',
    });
  }
  res.json({
    data: productoDesdeClass.readOne(productos, idSearch),
  });
});

router.get('/vista', (req, res) => {
  res.render('verProductos', {
    listaProductos: productos,
    hayProductos: productoDesdeClass.read(productos).length !== 0,
  });
});

export default router;
