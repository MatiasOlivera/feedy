import _ from 'lodash';
import { UserError } from 'graphql-errors';
import { IPagination } from 'graphql-schema';

/**
 * Get the page number from index 0
 * @param page The page
 * @returns The index of the page
 * @see https://vincit.github.io/objection.js/#page
 */
function getPage(page: number): number {
  return page - 1;
}

/**
 * Convert the column name to snake_case
 * @param column The column name
 */
function getColumn(column: string): string {
  return _.snakeCase(column);
}

/**
 * Checks if the column exists in the model
 * @param columns The table's columns
 * @param column The column name
 * @returns It's a valid column
 */
function validateColumn(columns: string[], column: string): boolean {
  return columns.includes(column);
}

function validatePaginationArgs(
  page: number,
  limit: number,
  columns: string[],
  column: string
): void {
  try {
    if (page < 1) {
      throw new UserError('Page must be a positive integer');
    }

    if (limit < 1) {
      throw new UserError('Limit must be a positive integer');
    }

    const isValidColumn = validateColumn(columns, column);
    if (!isValidColumn) {
      throw new UserError('OrderBy must be a valid object property');
    }
  } catch (error) {
    throw error;
  }
}

async function paginate(Model: any, args: IPagination): Promise<any> {
  try {
    const { page, limit, orderBy, direction, deleted } = args;

    const { columns } = await Model.fetchTableMetadata();
    const column = getColumn(orderBy);
    validatePaginationArgs(page, limit, columns, column);

    const pageNumber = getPage(page);

    let query = Model.query();
    query = deleted ? query.whereDeleted() : query.whereNotDeleted();
    query.orderBy(column, direction).page(pageNumber, limit);

    const rows = await query;

    return rows.results;
  } catch (err) {
    throw err;
  }
}

export default paginate;
