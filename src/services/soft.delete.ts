export default function(incomingOptions?: any) {
  const options = { ...incomingOptions, columnName: 'deleted_at' };

  return (Model: any) => {
    class SDQueryBuilder extends Model.QueryBuilder {
      // override the normal delete function with one that patches the row's "deleted_at" column
      delete() {
        this.mergeContext({ softDelete: true });

        return this.patch({
          [options.columnName]: new Date()
        });
      }

      // provide a way to actually delete the row if necessary
      hardDelete() {
        return super.delete();
      }

      // provide a way to undo the delete
      restore() {
        this.mergeContext({ restore: true });

        return this.patch({
          [options.columnName]: null
        });
      }

      // provide a way to filter to ONLY deleted records without having to remember the column name
      whereDeleted() {
        // qualify the column name
        return this.whereNotNull(
          `${this.modelClass().tableName}.${options.columnName}`
        );
      }

      // provide a way to filter out deleted records without having to remember the column name
      whereNotDeleted() {
        // qualify the column name
        return this.whereNull(
          `${this.modelClass().tableName}.${options.columnName}`
        );
      }
    }

    return class extends Model {
      static get QueryBuilder() {
        return SDQueryBuilder;
      }

      // add a named filter for use in the .eager() function
      static get namedFilters() {
        // patch the notDeleted filter into the list of namedFilters
        return Object.assign({}, super.namedFilters, {
          notDeleted: (b: any) => {
            b.whereNotDeleted();
          },
          deleted: (b: any) => {
            b.whereDeleted();
          }
        });
      }
    };
  };
}
