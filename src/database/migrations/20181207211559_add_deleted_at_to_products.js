exports.up = (knex) =>
  knex.schema.table('products', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('products', (table) => {
    table.dropColumn('deleted_at');
  });
