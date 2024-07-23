import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Message } from 'src/common/enums/message.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
        private dataSource: DataSource,
    ) {}
    async findByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email: email });
    }
    async findOne(id: string): Promise<User> {
        return this.userRepository.findOneBy({id});
    }
    
    async create(createDto: CreateUserDto): Promise<User> {
        const { username, email, password, roleName} = createDto;
        const roleEntity = await this.roleRepository.findOneBy({name: roleName});
        console.log(roleName, roleEntity);
        
        if (!roleEntity) {
            throw new Error('Role not found');
        }
        
        const user = new User(username, password, email, roleEntity);
        return await this.userRepository.save(user);
    }
    async update(updateUserDto: UpdateUserDto): Promise<String> {
        const {id, username, email, password, roleName } = updateUserDto;
        const roleEntity = await this.roleRepository.findOneBy({ name: roleName });
        if (!roleEntity) {
            throw new Error(Message.ROLE_NOT_FOUND);
        }
        const user = new User(username, password, email, roleEntity);
        const  updateResult = await this.userRepository.update(id, user);
        if(updateResult.affected === 0) {
            throw new Error(Message.USER_NOT_FOUND);
        }
        return Message.UPDATE_SUCCESS;
    }
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    async init() {
        const list: CreateUserDto[] = [
            {
                username: 'admin',
                email: 'nam@admin.com',
                password: '123',
                roleName: 'admin',
            },
            {
                username: 'user',
                email: 'nam@user.com',
                password: '123',
                roleName: 'user',
            }, 
        ];
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            for (const item of list) {
                const { username, email, password, roleName } = item;
                const roleEntity = await this.roleRepository.findOneBy({ name: roleName });
                if (!roleEntity) {
                    throw new Error(Message.ROLE_NOT_FOUND);
                }
                const user = new User(username, password, email, roleEntity);
                await queryRunner.manager.save(user);
            }
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new Error(Message.USER_ALREADY_EXISTS);
        } finally {
            await queryRunner.release();
        }
        return 'Init users successfully';
    }
    async deleteData() {
        return await this.userRepository.clear();
    }
}
