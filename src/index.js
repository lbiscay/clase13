import express from 'express';
import path from 'path';
import * as http from 'http';
import io from 'socket.io';
import moment from 'moment';
import { productos, Producto, mensajes } from './class';
import recursos from './recursos';

const app = express();
const puerto = 8080;

const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

app.set('view engine', 'pug');
const viewsPath = path.resolve(__dirname, '../views');
app.set('views', viewsPath);

const myServer = http.Server(app);

myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

app.get('/', (req, res) => {
  res.render('index');
});

const myWSServer = io(myServer);

myWSServer.on('connection', function (socket) {
  console.log(`El cliente ${socket.client.id} se ha conectado`);

  socket.on('new-product', function (data) {
    const newProduct = new Producto(
      data.title,
      data.price,
      data.thumbnail,
      productos[productos.length - 1].id + 1
    );
    if (
      newProduct.title !== '' &&
      newProduct.price !== '' &&
      newProduct.thumbnail !== ''
    ) {
      console.log(newProduct);
      productos.push(newProduct);
    } else {
      console.log('Error, campo vacio');
    }

    myWSServer.emit('products', productos);
  });
  socket.on('new-message', function (data) {
    const newMessage = {
      mail: data.mail,
      texto: data.texto,
      time: moment().format('h:mm a'),
    };
    console.log(newMessage);
    mensajes.push(newMessage);

    myWSServer.emit('messages', mensajes);
  });

  socket.on('askProducts', (data) => {
    socket.emit('products', productos);
  });
  socket.on('askMessages', (data) => {
    socket.emit('messages', mensajes);
  });
});

app.use('/api/productos', recursos);
