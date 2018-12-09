/* eslint-disable func-names */

const { Product } = require('../../../models');

const owner = async function(parent) {
  const product = await Product.query()
    .findById(parent.id)
    .eager('owner.[user, organization]');
  const { user, organization } = product.owner;

  return user || organization;
};

const issues = async function(parent) {
  const product = await Product.query()
    .findById(parent.id)
    .eager('issues');

  return product.issues;
};

module.exports = {
  Product: {
    owner,
    issues
  }
};
