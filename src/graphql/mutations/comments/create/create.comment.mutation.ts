import objection from 'objection';
import { CreateCommentValidator } from '../../../../app/validators';
import { knex } from '../../../../services/db.service';
import { Comment } from '../../../../models';

const createComment = async (root: any, args: any): Promise<any> => {
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

export default { Mutation: { createComment } };
