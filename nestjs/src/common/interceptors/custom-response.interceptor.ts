import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomResponse } from '../interfaces/custom-response.interface';
import { Message } from '../enums/message.enum';


@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, CustomResponse<T>> {
    constructor(private reflector: Reflector) {}

    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<CustomResponse<T>> {
        return next.handle().pipe(
            map((res: unknown) => {
                return this.responseHandler(res, context);
            }),
        );
    }

    responseHandler(res: any, context: ExecutionContext):CustomResponse<T> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;
        const message = Message.SUCCESS;

        return {
            statusCode,
            message: message,
            data: res,
            status: 'success',
            path: ctx.getRequest().url,
        };
    }
}
