/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name', 50).notNullable();
    table.string('description', 100);

    table
      .integer('owner_id', 10)
      .unsigned()
      .notNullable();

    table.timestamps(false, true);

    table
      .foreign('owner_id')
      .references('id')
      .inTable('product_owners');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('products');
};
