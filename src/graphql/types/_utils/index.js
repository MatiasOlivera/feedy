const { isEmpty } = require('lodash');

/**
 * Return null if the value is empty
 *
 * @param {*} value The value
 */
function isEmptyReturnNull(value) {
  return isEmpty(value) ? null : value;
}

module.exports = {
  isEmptyReturnNull
};
