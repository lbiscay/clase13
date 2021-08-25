import moment from 'moment';

export const productos = [
  {
    title: 'Taza',
    price: 150,
    thumbnail: 'https://image.flaticon.com/icons/png/128/2252/2252716.png',
    id: 1,
  },
  {
    title: 'Vaso',
    price: 100,
    thumbnail: 'https://image.flaticon.com/icons/png/128/4211/4211073.png',
    id: 2,
  },
  {
    title: 'Plato',
    price: 200,
    thumbnail: 'https://image.flaticon.com/icons/png/128/103/103137.png',
    id: 3,
  },
  {
    title: 'Cuchillo',
    price: 175,
    thumbnail: 'https://image.flaticon.com/icons/png/128/620/620298.png',
    id: 4,
  },
  {
    title: 'Tenedor',
    price: 125,
    thumbnail: 'https://image.flaticon.com/icons/png/128/368/368044.png',
    id: 5,
  },
];

export const mensajes = [];

export const formatMessages = (data) => {
  const { mail, texto } = data;
  return {
    mail,
    texto,
    time: moment().format('h:mm a'),
  };
};

export class Producto {
  constructor(title, price, thumbnail, id) {
    this.title = title;
    this.price = price;
    this.thumbnail = thumbnail;
    this.id = id;
  }
  read(array) {
    return array;
  }

  readOne(array, id) {
    const productoPorId = array.find((idProd) => idProd.id == id);
    return productoPorId;
  }

  write(array, nuevoProducto) {
    array.push(nuevoProducto);
    return nuevoProducto;
  }

  upgrade(array, id, prodActualizado) {
    if (array.find((prod) => prod.id === id)) {
      let productoAActualizar = array.find((prod) => prod.id === id);
      array[array.indexOf(productoAActualizar)] = prodActualizado;
      return prodActualizado;
    } else {
      return 'Error, producto inexistente.';
    }
  }

  delete(array, id) {
    let productoEliminado = array.find((prod) => prod.id === id);
    array.indexOf(productoEliminado);
    array.splice(array.indexOf(productoEliminado), 1);
    return productoEliminado;
  }
}

export const productoDesdeClass = new Producto();
