import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRoleDto {
    @IsString()
    @IsNotEmpty()
    id: number
    @IsString()
    @IsNotEmpty()
    name: string;
}