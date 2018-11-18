const organizationsQueries = require('./organizationsQueries');
const usersQueries = require('./usersQueries');

const Query = {
  ...organizationsQueries,
  ...usersQueries
};

module.exports = Query;
