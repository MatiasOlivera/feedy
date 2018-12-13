/* eslint-disable arrow-body-style */
import Knex from 'knex';

exports.up = (knex: Knex) => {
  return knex.schema.createTable('issues_comments', (table) => {
    table.integer('issue_id').unsigned();
    table.integer('comment_id').unsigned();

    table.primary(['issue_id', 'comment_id']);

    table
      .foreign('issue_id')
      .references('id')
      .inTable('issues');

    table
      .foreign('comment_id')
      .references('id')
      .inTable('comments');
  });
};

exports.down = (knex: Knex) => {
  return knex.schema.dropTable('issues_comments');
};
