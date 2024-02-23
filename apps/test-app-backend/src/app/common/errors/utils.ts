import { ValidationError } from '@nestjs/common';
import { ValidationResult } from '@test-app/api-interfaces/lib/form-validation';

export const formatClassValidatorErrors = (errors: ValidationError[]) => {
  return errors.map((e) => formatClassValidatorError(e)).flat();
};

const formatClassValidatorError = (error: ValidationError, path = ''): ValidationResult[] => {
  const results = [];
  const context = path ? `${path}.${error.property}` : error.property;
  if (error.children?.length) {
    results.push(...error.children.map((c) => formatClassValidatorError(c, context)).flat());
  } else {
    results.push({
      context,
      constraints: error.constraints,
      data: error.contexts,
    } as ValidationResult);
  }
  return results;
};
