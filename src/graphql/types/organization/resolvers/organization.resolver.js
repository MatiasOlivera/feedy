/* eslint-disable func-names */

const { Organization } = require('../../../../models');

const products = async function(parent) {
  const organization = await Organization.query()
    .findById(parent.id)
    .eager('productOwner.products');

  return organization.productOwner.products;
};

const members = async function(parent) {
  const organization = await Organization.query()
    .findById(parent.id)
    .eager('members');

  return organization.members;
};

module.exports = {
  Organization: {
    products,
    members
  }
};
