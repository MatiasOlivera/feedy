const organizationsQueries = require('./organizationsQueries');
const productsQueries = require('./productsQueries');
const usersQueries = require('./usersQueries');

const Query = {
  ...organizationsQueries,
  ...productsQueries,
  ...usersQueries
};

module.exports = Query;
