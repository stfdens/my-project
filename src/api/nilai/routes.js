const routes = (handler) => ([
  {
    method: 'POST',
    path: '/nilai',
    handler: handler.postNilaiByHandler,
  },
  {
    method: 'GET',
    path: '/nilai',
    handler: handler.getNilaiByHandler,
  },
  {
    method: 'GET',
    path: '/nilai/{id}',
    handler: handler.getNilaiByIdHandler,
  },
  {
    method: 'PUT',
    path: '/nilai/{id}',
    handler: handler.updateNilaiByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/nilai/{id}',
    handler: handler.deleteNilaiByIdHandler,
  },
]);

module.exports = routes;
