const routes = (handler) => ([
  {
    method: 'POST',
    path: '/murid',
    handler: handler.postMuridByHandler,
  },
  {
    method: 'GET',
    path: '/murid',
    handler: handler.getMuridByHandler,
  },
  {
    method: 'GET',
    path: '/murid/{id}',
    handler: handler.getMuridByIdHandler,
  },
  {
    method: 'PUT',
    path: '/murid/{id}',
    handler: handler.updateMuridByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/murid/{id}',
    handler: handler.deleteMuridByIdHandler,
  },
]);

module.exports = routes;
