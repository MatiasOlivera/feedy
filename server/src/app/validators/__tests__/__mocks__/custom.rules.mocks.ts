import { CustomAsyncRule, CustomSyncRule } from '../../rules.types';

export const isOfLegalAgeSync: CustomSyncRule = {
  type: 'sync',
  name: 'isOfLegalAgeSync',
  callback: (value, args, attribute) => value >= args,
  message: 'It is not of legal age'
};

export const isOfLegalAgeAsync: CustomAsyncRule = {
  type: 'async',
  name: 'isOfLegalAgeAsync',
  callback: (value, args, attribute, passes) =>
    value >= args ? passes() : passes(false, 'It is not of legal age'),
  message: 'It is not of legal age'
};
