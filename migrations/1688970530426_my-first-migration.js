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
    nis: {
      type: 'integer',
      notNull: true,
      unique: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('murid');
};
