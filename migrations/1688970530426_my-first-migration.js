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
};

exports.down = (pgm) => {
  pgm.dropTable('murid');
  pgm.dropTable('nilai');
};
