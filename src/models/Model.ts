import {
  Model as ObjectionModel,
  snakeCaseMappers,
  ModelOptions,
  QueryContext,
  ColumnNameMappers
} from 'objection';
import { SDQueryBuilder } from '../services/soft.delete';

class Model extends ObjectionModel {
  private created_at: Date;
  private updated_at: Date;

  get timestamps() {
    return true;
  }

  $beforeInsert(): void {
    if (this.timestamps) {
      const timestamp = new Date();
      this.created_at = timestamp;
      this.updated_at = timestamp;
    }
  }

  $beforeUpdate(opt: ModelOptions, queryContext: QueryContext): void {
    if (!queryContext.restore && this.timestamps) {
      this.updated_at = new Date();
    }
  }

  static get columnNameMappers(): ColumnNameMappers {
    return snakeCaseMappers();
  }

  static get modelPaths(): string[] {
    return [__dirname];
  }

  static get QueryBuilder() {
    return SDQueryBuilder;
  }

  // add a named filter for use in the .eager() function
  applyFilter(namedFilters: string[]) {
    // patch the notDeleted filter into the list of namedFilters
    return {
      ...namedFilters,
      notDeleted: (b: any) => {
        b.whereNotDeleted();
      },
      deleted: (b: any) => {
        b.whereDeleted();
      }
    };
  }
}

export default Model;
