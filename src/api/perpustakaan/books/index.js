const routes = require('./routes');
const BooksHandler = require('./handler');

exports.plugin = {
  name: 'Books',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const booksHandler = new BooksHandler(service, validator);
    server.route(routes(booksHandler));
  },
};
