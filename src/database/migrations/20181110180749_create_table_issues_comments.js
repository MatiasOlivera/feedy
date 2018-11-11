/* eslint-disable arrow-body-style */

exports.up = (knex) => {
  return knex.schema.createTable('issues_comments', (table) => {
    table.integer('issue_id', 10).unsigned();
    table.integer('comment_id', 10).unsigned();

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

exports.down = (knex) => {
  return knex.schema.dropTable('issues_comments');
};
