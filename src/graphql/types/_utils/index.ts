import { isEmpty } from 'lodash';

/**
 * Return null if the value is empty
 *
 * @param {*} Value The value to check
 */
function isEmptyReturnNull(value: any): any {
  return isEmpty(value) ? null : value;
}

export { isEmptyReturnNull };
