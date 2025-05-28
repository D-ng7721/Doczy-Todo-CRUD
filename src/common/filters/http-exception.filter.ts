import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Catch } from '@nestjs/common';
import { ResponseEntity } from '../types/response.type';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    const resolved = this.resolve(exception);
    return res.status(resolved.status).json({
      ...resolved.response,
    });
  }

  private resolve(exception: HttpException): {
    status: HttpStatus;
    response: ResponseEntity<null>;
  } {
    return {
      status: exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR,
      response: {
        success: false,
        error: (exception.getResponse() as { message?: string })?.message,
        data: null,
      },
    };
  }
}
