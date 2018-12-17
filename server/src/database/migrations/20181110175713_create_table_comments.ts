/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('parent_id').unsigned();
    table.string('body', 255).notNullable();

    table
      .integer('user_id')
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

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('comments');
};
