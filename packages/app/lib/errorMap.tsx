import {FieldError}from '../src/generated/graphql'



export const ErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ Field, Message }) => {
    errorMap[Field] = Message;
  });

  return errorMap;
};