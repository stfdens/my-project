const routes = (handler) => ([
  {
    method: 'POST',
    path: '/account',
    handler: handler.postAccountByHandler,
  },
  {
    method: 'GET',
    path: '/account/detail/{id}',
    handler: handler.getAccountByUsersHandler,
  },
  {
    method: 'PUT',
    path: '/account/update/{id}',
    handler: handler.updateAccountByUsersHandler,
  },
  {
    method: 'DELETE',
    path: '/account/delete/{id}',
    handler: handler.deleteAccountByUsersHandler,
  },
]);

module.exports = routes;
