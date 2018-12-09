/* eslint-disable func-names */

// eslint-disable-next-line no-underscore-dangle
const __resolveType = function(parent) {
  return parent.hasOwnProperty('username') ? 'User' : 'Organization';
};

module.exports = { ProductOwner: { __resolveType } };
