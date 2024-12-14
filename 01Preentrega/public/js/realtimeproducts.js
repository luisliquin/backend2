const socket = io();

socket.on('productList', products => {
    const productTableBody = document.querySelector('#product-table tbody');
    productTableBody.innerHTML = products.map(product => `
    <tr>
      <td>${product.title}</td>
      <td>${product.status ? 'Activo' : 'Inactivo'}</td>
      <td>${product.description}</td>
      <td>${product.price}</td>
      <td>
        ${product.thumbnails.length ? `<img src="${product.thumbnails[0]}" alt="Imagen del producto">` : 'Sin imagen'}
      </td>
      <td>${product.code}</td>
      <td>${product.stock}</td>
      <td>${product.category}</td>
    </tr>
  `).join('');
});