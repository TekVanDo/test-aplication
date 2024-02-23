import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ValidationResult, ValidationResultResponse } from '@test-app/api-interfaces/lib/form-validation';
import { ValidationException, ValidationExceptionBag } from './validationException';

@Catch(ValidationException, ValidationExceptionBag)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException | ValidationExceptionBag, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(HttpStatus.BAD_REQUEST).json(this.makeResponseBody(exception));
  }

  private makeResponseBody(
    exception: ValidationException | ValidationExceptionBag
  ): ValidationResultResponse {
    const exceptions = exception instanceof ValidationException ? [exception] : exception.exceptions;
    const validations = exceptions
      .map((e) => e.validationData)
      .reduce<ValidationResult[]>((res, val) => {
        const contextObj = res.find((r) => r.context === val.context);
        if (contextObj) {
          const constraints = contextObj.constraints;
          const data = contextObj.data;
          constraints[val.validationName] = val.message;
          data[val.validationName] = val.data;
        } else {
          const constraints = {};
          const data = {};
          constraints[val.validationName] = val.message;
          data[val.validationName] = val.data;
          res.push({ context: val.context, constraints, data });
        }
        return res;
      }, []);
    return { validations };
  }
}
