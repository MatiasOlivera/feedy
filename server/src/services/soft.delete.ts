import { QueryBuilder } from 'objection';

export class SDQueryBuilder<QM, RM = QM[], RV = RM> extends QueryBuilder<
  QM,
  RM,
  RV
> {
  public columnName: string = 'deleted_at';

  // override the normal delete function with one that patches the row's "deleted_at" column
  delete() {
    this.mergeContext({ softDelete: true });
    return this.patch({ [this.columnName]: new Date() } as any);
  }

  // provide a way to actually delete the row if necessary
  hardDelete() {
    return super.delete();
  }

  // provide a way to undo the delete
  restore() {
    this.mergeContext({ restore: true });
    return this.patch({ [this.columnName]: null } as any);
  }

  // provide a way to filter to ONLY deleted records without having to remember the column name
  whereDeleted() {
    // qualify the column name
    return this.whereNotNull(
      `${this.modelClass().tableName}.${this.columnName}`
    );
  }

  // provide a way to filter out deleted records without having to remember the column name
  whereNotDeleted() {
    // qualify the column name
    return this.whereNull(`${this.modelClass().tableName}.${this.columnName}`);
  }
}
