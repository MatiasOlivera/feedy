import { RegisterAsyncCallback, RegisterCallback } from 'validatorjs';

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
  callback: RegisterAsyncCallback;
  message: string;
}

export type RuleType = 'sync' | 'async';
