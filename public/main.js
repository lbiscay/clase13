const socket = io.connect('http://localhost:8080', { forceNew: true });

socket.emit('askProducts');
socket.emit('askMessages');

function sendDataPr(e) {
  const producto = {
    title: document.getElementById('nombre').value,
    price: document.getElementById('precio').value,
    thumbnail: document.getElementById('imagen').value,
  };
  socket.emit('new-product', producto);
  return false;
}

function sendDataMe(e) {
  const mensaje = {
    mail: document.getElementById('mail').value,
    texto: document.getElementById('mensaje').value,
  };
  socket.emit('new-message', mensaje);
  return false;
}

function renderPr(productos) {
  let pr = productos
    .map((producto) => {
      return `<div>
                <tr>
                <td style= 'font-size: 30px; text-align: center'>${producto.title}</td>
                <td style= 'font-size: 30px; text-align: center'>${producto.price}</td>
                <td style= 'text-align: center'><img class ='img-fluid' src=${producto.thumbnail} alt="")</td>
        </div>`;
    })
    .join(' ');

  document.getElementById('products').innerHTML = pr;
}

function renderMe(mensajes) {
  const div = document.createElement('div');
  let me = mensajes
    .map((mensaje) => {
      return (div.innerHTML = `<div>
                <tr>
                <p class="meta" style='font-size:20px; font-weight:bold;'>${mensaje.mail}<span style='font-size:16px; font-weight:normal;'> ${mensaje.time}</span></p>
                <p class="text"> ${mensaje.texto} </p>
                <hr>
        </div>`);
    })
    .join(' ');

  document.getElementById('messages').innerHTML = me;
}

socket.on('products', function (dataProductos) {
  renderPr(dataProductos);
});

socket.on('messages', function (dataMensajes) {
  renderMe(dataMensajes);
});
