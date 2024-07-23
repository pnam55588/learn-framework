import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { RolesService } from './roles/roles.service';

@Injectable()
export class AppService {
    constructor(private usersService: UsersService, private rolesService: RolesService){}
    getHello(): string {
        return 'Hello World 2';
    }

    async init() {
        await this.rolesService.init();
        await this.usersService.init();
        return 'Init success';
    }

}
