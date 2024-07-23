// import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username: string;
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    roleName: string;
}
