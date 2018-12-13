import { isEmpty } from 'lodash';

/**
 * Return null if the value is empty
 *
 * @param {*} The value
 */
function isEmptyReturnNull(value: any): any {
  return isEmpty(value) ? null : value;
}

export { isEmptyReturnNull };
