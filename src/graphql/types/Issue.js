/* eslint-disable func-names */

const { Issue } = require('../../models');

const author = async function(parent) {
  const product = await Issue.query()
    .findById(parent.id)
    .eager('author');

  return product.author;
};

const product = async function(parent) {
  const issue = await Issue.query()
    .findById(parent.id)
    .eager('product');

  return issue.product;
};

const comments = async function(parent) {
  const issue = await Issue.query()
    .findById(parent.id)
    .eager('comments');

  return issue.comments;
};

module.exports = {
  author,
  product,
  comments
};
