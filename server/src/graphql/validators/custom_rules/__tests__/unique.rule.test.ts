import uniqueRule, { searchModelInTheDatabase } from '../unique.rule';

const passes = jest.fn(
  (success?: boolean, message?: string): void => undefined
);

test('searchModelInTheDatabase() should return an user when the user exists', async () => {
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

test('the rule should fail when the user exists', async () => {
  const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

  await uniqueRule.callback(
    'MatiasOlivera',
    'user,username',
    'username',
    passes,
    searchModel
  );
  expect(passes).toBeCalledWith(false, 'The username has already been taken.');
});

test('searchModelInTheDatabase() should return an empty object when the user exists but it is the same', async () => {
  const dbUser = { user: {} };
  const db: any = { $graphql: jest.fn(() => dbUser) };
  const user = await searchModelInTheDatabase(
    {
      model: 'user',
      field: 'username',
      value: 'MatiasOlivera',
      idField: 'id',
      except: '1'
    },
    db
  );
  expect(user).toEqual(dbUser);
});

test('the rule should pass when the user exists but it is the same', async () => {
  const searchModel = jest.fn(() => ({ user: {} }));

  await uniqueRule.callback(
    'MatiasOlivera',
    'user,username,1',
    'username',
    passes,
    searchModel
  );
  expect(passes).toBeCalledWith();
});

test('should assign fallback values to the model and the field', async () => {
  const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

  await uniqueRule.callback(
    'MatiasOlivera',
    'user',
    'username',
    passes,
    searchModel
  );
  expect(searchModel).toBeCalledWith({
    model: 'user',
    value: 'MatiasOlivera',
    field: 'username',
    idField: null,
    except: null
  });
  expect(passes).toBeCalledWith(false, 'The username has already been taken.');
});

test('should throw an error when model is not specified', async () => {
  expect.assertions(1);

  try {
    const searchModel = jest.fn(() => ({ user: { id: 'id' } }));

    await uniqueRule.callback(
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

    await uniqueRule.callback('MatiasOlivera', 'user', '', passes, searchModel);
  } catch (error) {
    expect(error).toEqual(Error('The field name must be specified.'));
  }
});

test("the rule should pass when the user doesn't exists", async () => {
  const searchModel = jest.fn(() => ({}));

  await uniqueRule.callback(
    'M4T14S',
    'user,username',
    'username',
    passes,
    searchModel
  );
  expect(passes).toBeCalledWith();
});
