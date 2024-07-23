import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AllExceptionFilter } from './common/exceptions/all-exception.filter';
import { ValidatePipe } from './common/validates/validate.pipe';
import { ResponseInterceptor } from './common/interceptors/custom-response.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/role.entity';
import { PermissionsModule } from './permissions/permissions.module';
import { RolePermissionsModule } from './role-permissions/role-permissions.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'password', 
            database: 'phn',
            entities: [User, Role],
            synchronize: true,
          }),
        UsersModule,
        AuthModule,
        RolesModule,
        PermissionsModule,
        RolePermissionsModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionFilter,
        },
        {
            provide: APP_PIPE,
            useClass: ValidatePipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes({ path: '*', method: RequestMethod.ALL });
    }
}
