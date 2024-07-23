import { UsersModule } from 'src/users/users.module';
import { AuthService } from './Auth.service';
import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Module({
    imports: [
        forwardRef(() => UsersModule),
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '30 days' },
            })
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, {
        provide: 'APP_GUARD',
        useClass: AuthGuard,
    },{
        provide: 'APP_GUARD',
        useClass: RolesGuard,
    }],
    exports: [AuthService],
})
export class AuthModule {}
