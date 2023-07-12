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
  pgm.createTable('account', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    username: {
      type: 'varchar(30)',
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
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('CURRENT_TIMESTAMP'),
      onUpdate: pgm.func('CURRENT_TIMESTAMP'),
    },
  });
  pgm.createTable('role', {
    owner: {
      type: 'varchar',
      notNull: false,
    },
    admin: {
      type: 'varchar',
      notNull: false,
    },
    siswa: {
      type: 'varchar',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('murid');
  pgm.dropTable('nilai');
  pgm.dropTable('account');
};
