// dotenv
require('dotenv').config();

// hapi framwork
const Hapi = require('@hapi/hapi');

// murid
const MuridService = require('./service/murid/MuridService');
const Murid = require('./api/murid');
const MuridValidator = require('./validator/murid');

// nilai
const NilaiService = require('./service/nilai/NilaiService');
const nilai = require('./api/nilai');
const NilaiValidator = require('./validator/nilai');

const init = async () => {
  const muridService = new MuridService();
  const nilaiService = new NilaiService();

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
    {
      plugin: nilai,
      options: {
        service: nilaiService,
        validator: NilaiValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
