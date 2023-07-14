const routes = (handler) => ([
  {
    method: 'POST',
    path: '/perpustakaan/books',
    handler: handler.postBooksByHandler,
  },
  {
    method: 'GET',
    path: '/perpustakaan/books',
    handler: handler.getBooksByHandler,
  },
  {
    method: 'GET',
    path: '/perpustakaan/books/{id}',
    handler: handler.getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/perpustakaan/books/{id}',
    handler: handler.updateBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/perpustakaan/books/{id}',
    handler: handler.deleteBooksByIdHandler,
  },
]);

module.exports = routes;
