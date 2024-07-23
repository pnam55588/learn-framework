import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permission)
        private permissionRepository: Repository<Permission>
    ) {}
}
