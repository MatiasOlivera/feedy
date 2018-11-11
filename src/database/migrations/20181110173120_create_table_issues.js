/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('issues', (table) => {
    table.increments('id').primary();
    table.string('title', 50).notNullable();
    table.text('body').notNullable();

    table
      .integer('user_id', 10)
      .unsigned()
      .notNullable();

    table
      .integer('product_id', 10)
      .unsigned()
      .notNullable();

    table.timestamps(false, true);

    table
      .foreign('user_id')
      .references('id')
      .inTable('users');

    table
      .foreign('product_id')
      .references('id')
      .inTable('products');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('issues');
};
