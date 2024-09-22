import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiResponseDto } from '../dtos/api-response.dto';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let message = 'An error occurred';
    let additionalInfo: any = null;

    if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse();
      if (typeof responseBody === 'object' && responseBody['message']) {
        if (Array.isArray(responseBody['message'])) {
          additionalInfo = responseBody['message'].map(
            (error: ValidationError) => ({
              property: error.property,
              constraints: error.constraints,
            }),
          );
          message = 'Validation failed';
        } else {
          message = responseBody['message'];
        }
      }
    } else if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (
      typeof exceptionResponse === 'object' &&
      exceptionResponse['message']
    ) {
      message = exceptionResponse['message'];
    }

    if (message === 'Validation failed') {
      return;
    }

    const apiResponse: ApiResponseDto<null> = {
      statusCode: status,
      message,
      data: null,
      additionalInfo,
    };

    response.status(status).json(apiResponse);
  }
}
