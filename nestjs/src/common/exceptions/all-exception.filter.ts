import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import { CustomResponse } from '../interfaces/custom-response.interface';
import { QueryFailedError } from 'typeorm';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: HttpException | Error | QueryFailedError, host: ArgumentsHost): void {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus = 
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody: CustomResponse<null>= {
            statusCode: httpStatus,
            status: 'error',
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message:  exception.message,
            data: null,
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
