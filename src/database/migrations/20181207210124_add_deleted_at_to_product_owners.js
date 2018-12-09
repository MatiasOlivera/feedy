exports.up = (knex) =>
  knex.schema.table('product_owners', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('product_owners', (table) => {
    table.dropColumn('deleted_at');
  });
