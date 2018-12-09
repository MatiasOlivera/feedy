exports.up = (knex) =>
  knex.schema.table('users', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('users', (table) => {
    table.dropColumn('deleted_at');
  });
