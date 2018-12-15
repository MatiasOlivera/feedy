import { Model as ObjectionModel, snakeCaseMappers } from 'objection';
import softDelete from '../services/soft.delete';

class Model extends softDelete()(ObjectionModel) {
  protected timestamps: boolean;
  private created_at: Date;
  private updated_at: Date;

  constructor() {
    super();
    this.timestamps = true;
  }

  $beforeInsert(): void {
    if (this.timestamps) {
      const timestamp = new Date();
      this.created_at = timestamp;
      this.updated_at = timestamp;
    }
  }

  $beforeUpdate(opt: any, queryContext: any): void {
    if (!queryContext.restore && this.timestamps) {
      this.updated_at = new Date();
    }
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }

  static get modelPaths(): string[] {
    return [__dirname];
  }
}

export default Model;
