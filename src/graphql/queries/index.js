const issuesQueries = require('./issuesQueries');
const organizationsQueries = require('./organizationsQueries');
const productsQueries = require('./productsQueries');
const usersQueries = require('./usersQueries');

const Query = {
  ...issuesQueries,
  ...organizationsQueries,
  ...productsQueries,
  ...usersQueries
};

module.exports = Query;
