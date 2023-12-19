import { body } from 'express-validator';

export const userValidationRules = [
  body('name').exists().isString(),
  body('email').exists().isEmail(),
  body('age').exists().isNumeric(),
];
