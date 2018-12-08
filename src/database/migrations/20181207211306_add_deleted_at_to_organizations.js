exports.up = (knex) =>
  knex.schema.table('organizations', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('organizations', (table) => {
    table.dropColumn('deleted_at');
  });
