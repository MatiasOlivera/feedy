/* eslint-disable func-names */

const { Comment } = require('../../models');

const author = async function(parent) {
  const comment = await Comment.query()
    .findById(parent.id)
    .eager('author');

  return comment.author;
};

const issue = async function(parent) {
  const comment = await Comment.query()
    .findById(parent.id)
    .eager('issue');

  return comment.issue;
};

const parent = async function(_parent) {
  const comment = await Comment.query()
    .findById(_parent.id)
    .eager('parent');

  return comment.parent;
};

const children = async function(_parent) {
  const comment = await Comment.query()
    .findById(_parent.id)
    .eager('children');

  return comment.children;
};

module.exports = {
  author,
  issue,
  parent,
  children
};
