/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('organizations', (table) => {
    table
      .integer('id', 10)
      .unsigned()
      .primary();

    table.string('name', 50).notNullable();
    table.string('bio', 255);
    table.timestamps(false, true);

    table
      .foreign('id')
      .references('id')
      .inTable('product_owners');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('organizations');
};
