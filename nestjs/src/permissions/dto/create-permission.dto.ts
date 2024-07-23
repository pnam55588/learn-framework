import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ApiMethod } from 'src/common/enums/api-method.enum';

export class CreatePermissionDto {
    @IsEnum(ApiMethod)
    method: ApiMethod;

    @IsString()
    @IsNotEmpty()
    path: string;
}
