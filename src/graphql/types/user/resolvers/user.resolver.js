/* eslint-disable func-names */

const { User } = require('../../../../models');

const products = async function(parent) {
  const user = await User.query()
    .findById(parent.id)
    .eager('productOwner.products');

  return user.productOwner.products;
};

const organizations = async function(parent) {
  const user = await User.query()
    .findById(parent.id)
    .eager('organizations');

  return user.organizations;
};

const issues = async function(parent) {
  const user = await User.query()
    .findById(parent.id)
    .eager('issues');

  return user.issues;
};

const comments = async function(parent) {
  const user = await User.query()
    .findById(parent.id)
    .eager('comments');

  return user.comments;
};

module.exports = {
  User: {
    products,
    organizations,
    issues,
    comments
  }
};
