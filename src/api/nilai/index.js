const NilaiHandler = require('./handler');
const routes = require('./routes');

exports.plugin = {
  name: 'nilai',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const nilaiHandler = new NilaiHandler(service, validator);
    server.route(routes(nilaiHandler));
  },
};
