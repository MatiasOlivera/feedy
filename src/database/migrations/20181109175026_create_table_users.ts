/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('users', (table) => {
    table
      .integer('id')
      .unsigned()
      .primary();

    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.enu('gender', ['Female', 'Male', 'Other']).notNullable();

    table
      .string('username', 50)
      .notNullable()
      .unique();

    table.string('password', 25).notNullable();

    table
      .string('email', 50)
      .notNullable()
      .unique();

    table.string('bio', 255);
    table.timestamps(false, true);

    table
      .foreign('id')
      .references('id')
      .inTable('product_owners');
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('users');
};
