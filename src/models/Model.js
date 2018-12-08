const { Model: ObjectionModel, snakeCaseMappers } = require('objection');
const softDelete = require('../services/soft.delete.query.builder');

class Model extends softDelete()(ObjectionModel) {
  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }

  static get columnNameMappers() {
    return snakeCaseMappers();
  }
}

module.exports = Model;
