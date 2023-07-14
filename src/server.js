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

// account
const AccountService = require('./service/account/usersService');
const account = require('./api/account');
const accountValidator = require('./validator/account');

// perpustakaan books
const BooksService = require('./service/perpustakaan/books/BooksService');
const books = require('./api/perpustakaan/books');
const PerpusBooksValidator = require('./validator/perpustakaan/books');

const init = async () => {
  const muridService = new MuridService();
  const nilaiService = new NilaiService();
  const accountService = new AccountService();
  const booksService = new BooksService();

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
    {
      plugin: account,
      options: {
        service: accountService,
        validator: accountValidator,
      },
    },
    {
      plugin: books,
      options: {
        service: booksService,
        validator: PerpusBooksValidator,
      },
    },
  ]);

  await server.start();
  console.log(server.info.uri);
};

init();
