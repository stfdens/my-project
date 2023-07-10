const MuridHandler = require('./handler');
const routes = require('./routes');

exports.plugin = {
  name: 'Murid',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const muridHandler = new MuridHandler(service, validator);
    server.route(routes(muridHandler));
  },
};
