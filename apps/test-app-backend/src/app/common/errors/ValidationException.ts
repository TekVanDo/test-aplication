export type ExceptionContext = 'global' | string;

export interface ValidationExceptionData {
  message: string;
  validationName: string;
  context: ExceptionContext;
  data?: Record<string, string>;
}

export class ValidationException extends Error {
  constructor(
    public readonly message: string,
    public readonly validationName: string,
    public readonly context: ExceptionContext = 'global',
    public readonly data: Record<string, string> = {}
  ) {
    super();
  }

  get validationData(): ValidationExceptionData {
    return {
      message: this.message,
      validationName: this.validationName,
      context: this.context,
      data: this.data,
    };
  }
}

export class ValidationExceptionBag extends Error {
  constructor(public readonly exceptions: ValidationException[]) {
    super();
  }

  toString(): string {
    return JSON.stringify(this.exceptions.map((e) => e.toString()));
  }

  push(exception: ValidationException) {
    this.exceptions.push(exception);
  }
}
