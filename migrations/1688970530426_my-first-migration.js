/* eslint-disable camelcase */

/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('murid', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    nama: {
      type: 'varchar(24)',
      notNull: true,
    },
    jurusan: {
      type: 'varchar(50)',
      notNull: true,
    },
    kelas: {
      type: 'varchar',
      notNull: true,
    },
    nisn: {
      type: 'integer',
      notNull: true,
      unique: true,
    },
    kartupelajar: {
      type: 'integer',
      notNull: true,
      unique: true,
    },
  });

  pgm.createTable('nilai', {
    id: {
      type: 'varchar',
      primaryKey: true,
    },
    kartupelajar: {
      type: 'integer',
      notNull: true,
      unique: true,
    },
    instrumen: {
      type: 'integer',
      notNull: true,
    },
    aba: {
      type: 'integer',
      notNull: true,
    },
    abo: {
      type: 'integer',
      notNull: true,
    },
    atg: {
      type: 'integer',
      notNull: true,
    },
    mikro: {
      type: 'integer',
      notNull: true,
    },
  });

  pgm.createTable('role', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: {
      type: 'varchar',
      notNull: true,
    },
    description: {
      type: 'varchar',
      notNull: true,
    },
  });

  pgm.createTable('account', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'varchar(30)',
      notNull: true,
    },
    status: {
      type: 'varchar(5)',
      notNull: true,
    },
    email: {
      type: 'varchar',
      notNull: true,
    },
    password: {
      type: 'varchar',
      notNull: true,
    },
    created_at: {
      type: 'varchar',
      notNull: true,
    },
    updated_at: {
      type: 'varchar',
      notNull: true,
    },
  });

  pgm.createTable('books', {
    serial_id: {
      type: 'varchar',
      notNull: true,
    },
    nama_buku: {
      type: 'varchar',
      notNull: true,
    },
    genre: {
      type: 'varchar',
      notNull: true,
    },
    halaman_buku: {
      type: 'integer',
      notNull: true,
    },
  });

  pgm.createTable('perpustakaan', {
    kartupelajar: {
      type: 'integer',
      notNull: true,
    },
    namabuku: {
      type: 'varchar',
      notNull: true,
    },
    genre: {
      type: 'varchar',
      notNull: true,
    },
    tanggal_peminjaman: {
      type: 'varchar',
      notNull: true,
    },
    tanggal_pengembalian: {
      type: 'varchar',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('murid');
  pgm.dropTable('nilai');
  pgm.dropTable('account');
  pgm.dropTable('role');
  pgm.dropTable('perpustakaan');
  pgm.dropTable('books');
};
