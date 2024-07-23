import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUser } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CustomHttpException } from 'src/common/exceptions/custom-http.exception';
import { Message } from 'src/common/enums/message.enum';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ user: User; access_token: string }> {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new CustomHttpException(
                Message.USER_NOT_FOUND,
                HttpStatus.NOT_FOUND,
            );
        }
        if (user?.password !== pass) {
            throw new CustomHttpException(
                Message.WRONG_PASSWORD,
                HttpStatus.UNAUTHORIZED,
            );
        }
        const payload = { email: user.email, id: user.id, role: user.role };
        const token = await this.jwtService.signAsync(payload);
        return { user, access_token: token };
    }
}
