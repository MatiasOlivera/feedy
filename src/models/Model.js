const { Model: ObjectionModel, snakeCaseMappers } = require('objection');
const softDelete = require('../services/soft.delete.query.builder');

class Model extends softDelete()(ObjectionModel) {
  $beforeInsert() {
    if (this.constructor.timestamps) {
      const timestamp = new Date();
      this.created_at = timestamp;
      this.updated_at = timestamp;
    }
  }

  $beforeUpdate() {
    if (this.constructor.timestamps) {
      this.updated_at = new Date();
    }
  }

  static get timestamps() {
    return true;
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = Model;
