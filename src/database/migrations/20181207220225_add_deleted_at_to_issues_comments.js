exports.up = (knex) =>
  knex.schema.table('issues_comments', (table) => {
    table.datetime('deleted_at');
  });

exports.down = (knex) =>
  knex.schema.table('issues_comments', (table) => {
    table.dropColumn('deleted_at');
  });
