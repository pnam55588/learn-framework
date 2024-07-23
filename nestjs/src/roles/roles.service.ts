import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { DataSource, Repository } from 'typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Message } from 'src/common/enums/message.enum';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private dataSource: DataSource,
    ) {}
    async create(createDto: CreateRoleDto): Promise<Role> {
        const role = new Role(createDto.name);
        return await this.roleRepository.save(role);
    }
    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find();
    }
    async findByName(name: string): Promise<Role> {
        return await this.roleRepository.findOneBy({ name });
    }
    async update(updateDto: UpdateRoleDto): Promise<Role> {
        const role = new Role(updateDto.name);
        return (await this.roleRepository.update(role.id, role)).raw;
    }
    async init() {
        const list: CreateRoleDto[] = [{ name: 'admin' }, { name: 'user' }];
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for(const item of list) {
                const role = new Role(item.name);
                await queryRunner.manager.save(role);
            };
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(Message.ROLE_ALREADY_EXISTS);
        }finally {
            await queryRunner.release();
        }
        return Message.INIT_SUCCESS;
    }
}
