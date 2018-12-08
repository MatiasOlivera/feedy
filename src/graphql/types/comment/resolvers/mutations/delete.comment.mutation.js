const objection = require('objection');
const { knex } = require('../../../../../services/db.service');
const { Comment } = require('../../../../../models');

const deleteComment = async (root, args) => {
  let comment;

  try {
    comment = await Comment.query().findById(args.id);

    if (!comment)
      return {
        operation: { status: false, message: 'The comment does not exists' },
        comment: null
      };
  } catch (err) {
    throw err;
  }

  const tsx = await objection.transaction.start(knex);
  try {
    await comment
      .$relatedQuery('issue', tsx)
      .unrelate()
      .where('comment_id', args.id);
    await Comment.query(tsx).deleteById(args.id);

    await tsx.commit();

    comment = await Comment.query().findById(args.id);

    return {
      operation: {
        status: true,
        message: 'The comment was deleted succesfully'
      },
      comment
    };
  } catch (err) {
    await tsx.rollback();
    throw err;
  }
};

module.exports = { Mutation: { deleteComment } };
