/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('parent_id').unsigned();
    table.string('body', 255).notNullable();

    table
      .integer('user_id', 10)
      .unsigned()
      .notNullable();

    table.timestamps(false, true);

    table
      .foreign('parent_id')
      .references('id')
      .inTable('comments');

    table
      .foreign('user_id')
      .references('id')
      .inTable('users');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('comments');
};
