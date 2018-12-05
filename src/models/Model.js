const { Model: ObjectionModel, snakeCaseMappers } = require('objection');

class Model extends ObjectionModel {
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
