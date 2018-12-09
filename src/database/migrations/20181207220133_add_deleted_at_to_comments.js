exports.up = (knex) =>
  knex.schema.table('comments', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('comments', (table) => {
    table.dropColumn('deleted_at');
  });
