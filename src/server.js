// dotenv
require('dotenv').config();

// hapi framwork
const Hapi = require('@hapi/hapi');

// murid
const MuridService = require('./service/murid/MuridService');
const Murid = require('./api/murid');
const MuridValidator = require('./validator/murid');

const init = async () => {
  const muridService = new MuridService();

  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: Murid,
      options: {
        service: muridService,
        validator: MuridValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
