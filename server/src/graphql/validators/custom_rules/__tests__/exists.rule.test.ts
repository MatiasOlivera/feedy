import existsRule, { searchModelInTheDatabase } from '../exists.rule';

const passes = jest.fn(
  (success?: boolean, message?: string): void => undefined
);

test('searchModelInTheDatabase() should return an user', async () => {
  const dbUser = { user: { id: 'id' } };
  const db: any = { $graphql: jest.fn(() => dbUser) };
  const user = await searchModelInTheDatabase(
    {
      model: 'user',
      field: 'username',
      value: 'MatiasOlivera'
    },
    db
  );
  expect(user).toEqual(dbUser);
});

test('the rule should pass when the user exists', async () => {
  const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

  await existsRule.callback(
    'MatiasOlivera',
    'user,username',
    'username',
    passes,
    searchModel
  );
  expect(passes).toBeCalledWith();
});

test('should assign fallback values to the model and the field', async () => {
  const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

  await existsRule.callback(
    'MatiasOlivera',
    'user',
    'username',
    passes,
    searchModel
  );
  expect(searchModel).toBeCalledWith({
    model: 'user',
    field: 'username',
    value: 'MatiasOlivera'
  });
  expect(passes).toBeCalledWith();
});

test('should throw an error when model is not specified', async () => {
  expect.assertions(1);

  try {
    const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

    await existsRule.callback(
      'MatiasOlivera',
      '',
      'username',
      passes,
      searchModel
    );
  } catch (error) {
    expect(error).toEqual(Error('The model name must be specified.'));
  }
});

test('should throw an error when field is not specified', async () => {
  expect.assertions(1);

  try {
    const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

    await existsRule.callback('MatiasOlivera', 'user', '', passes, searchModel);
  } catch (error) {
    expect(error).toEqual(Error('The field name must be specified.'));
  }
});

test("the rule should fail when the user doesn't exists", async () => {
  const findModelByField = jest.fn(() => ({}));

  await existsRule.callback(
    'M4T14S',
    'user,username',
    'username',
    passes,
    findModelByField
  );
  expect(passes).toBeCalledWith(false, 'User does not exists.');
});
