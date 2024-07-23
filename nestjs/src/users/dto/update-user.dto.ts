import { IsNotEmpty, IsEmail } from 'class-validator';
export class UpdateUserDto {
    @IsNotEmpty()
    id?: string;
    username?: string;
    email?: string;
    password?: string;
    roleName?: string;
}