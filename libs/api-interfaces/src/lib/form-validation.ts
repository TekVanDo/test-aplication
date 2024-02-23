export interface ValidationResult {
  context: string;
  constraints: { [k: string]: string };
  data?: Record<string, Record<string, string>>;
}

export interface ValidationResultResponse {
  validations: ValidationResult[];
}

export const isValidationResult = (
  error: Error | ValidationResultResponse
): error is ValidationResultResponse => {
  return !!(error as ValidationResultResponse)?.validations?.length;
};
