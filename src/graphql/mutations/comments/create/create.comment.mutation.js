const objection = require('objection');
const { CreateCommentValidator } = require('../../../../app/validators');
const { knex } = require('../../../../services/db.service');
const { Comment } = require('../../../../models');

const createComment = async (root, args) => {
  const { comment } = args;

  try {
    const validator = new CreateCommentValidator(comment);
    await validator.validate();
  } catch (err) {
    return {
      operation: { status: false, message: 'There are validation errors' },
      comment: null,
      errors: err
    };
  }

  const tsx = await objection.transaction.start(knex);
  try {
    const { issueId, ...inputComment } = comment;

    const newComment = await Comment.query().insertAndFetch(inputComment);
    await newComment.$relatedQuery('issue', tsx).relate(issueId);

    await tsx.commit();

    return {
      operation: {
        status: true,
        message: 'The comment was created succesfully'
      },
      comment: newComment,
      errors: null
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

module.exports = { Mutation: { createComment } };
