import { RegisterCallback } from 'validatorjs';

export type CustomRule = CustomSyncRule | CustomAsyncRule;

export interface CustomSyncRule {
  type: 'sync';
  name: string;
  callback: RegisterCallback;
  message: string;
}

export interface CustomAsyncRule {
  type: 'async';
  name: string;
  callback: AsyncCallback;
  message: string;
}

export type AsyncCallback = (
  value: Value,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void,
  searchModel: (params: Params) => any
) => void;

export type Value = string | number | boolean;

export interface Params {
  model: string;
  field: string;
  value: Value;
  [key: string]: any;
}

export type RuleType = 'sync' | 'async';
