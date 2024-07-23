import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/decorators/Public.decorator';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get('profile')
    profileToken(@Request() req) {
        return req.user;
    }
    @Post()
    @Public()
    create(@Body() createDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createDto);
    }
    @Put()
    update(@Body() updateDto: UpdateUserDto): Promise<String> {
        return this.usersService.update(updateDto);
    }
    @Get('findByEmail')
    @Public()
    findOneByEmail(@Query('email') email: string): Promise<User> {
        return this.usersService.findByEmail(email);
    }
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }
    
    @Get(':id')
    @Public()
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post('init')
    @Public()
    init() {
        return this.usersService.init();
    }
    @Delete('deleteData')
    @Public()
    deleteData() {
        return this.usersService.deleteData();
    }
}
